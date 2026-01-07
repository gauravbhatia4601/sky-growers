import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';
import mongoose from 'mongoose';
import { createOrderSchema, createContactOrderSchema } from '@/lib/validations/order';
import {
  rateLimit,
  getClientIP,
  checkDuplicateOrder,
  sanitizeInput,
  normalizePhone,
  validateBodySize,
  containsSpamPatterns,
} from '@/lib/utils/security';
import { updateStatsOnOrderCreate } from '@/lib/utils/stats';
import { enqueueOrderPlaced } from '@/lib/email/queue';
import { z } from 'zod';

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SG-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    // Stricter rate limiting for public endpoint (5 requests per 15 minutes)
    if (!rateLimit(request, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate request body size
    const bodyText = await request.text();
    if (!validateBodySize(bodyText)) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Honeypot field check (bot detection)
    if (body.website && body.website.length > 0) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    await connectDB();

    // Determine if this is a contact form order (has items but no productId) or regular order
    const isContactOrder = 
      body.items && 
      Array.isArray(body.items) && 
      body.items.length > 0 && 
      body.items.every((item: any) => !item.productId && item.productName);

    let validatedData;
    
    if (isContactOrder) {
      // Use contact order schema (no productId required)
      validatedData = createContactOrderSchema.parse(body);
      
      // Check for spam patterns
      const allText = [
        validatedData.customerName,
        validatedData.notes || '',
        validatedData.businessName || '',
      ].join(' ');
      
      if (containsSpamPatterns(allText)) {
        return NextResponse.json(
          { error: 'Invalid request content' },
          { status: 400 }
        );
      }

      // Check for duplicate orders
      if (checkDuplicateOrder(validatedData.customerEmail, validatedData.customerPhone)) {
        return NextResponse.json(
          { error: 'Duplicate order detected. Please wait a few minutes before submitting again.' },
          { status: 429 }
        );
      }

      // Sanitize all string inputs
      validatedData.customerName = sanitizeInput(validatedData.customerName);
      validatedData.customerPhone = normalizePhone(validatedData.customerPhone);
      if (validatedData.businessName) {
        validatedData.businessName = sanitizeInput(validatedData.businessName);
      }
      if (validatedData.deliveryAddress) {
        validatedData.deliveryAddress = sanitizeInput(validatedData.deliveryAddress);
      }
      if (validatedData.notes) {
        validatedData.notes = sanitizeInput(validatedData.notes);
      }
    } else {
      // Use regular order schema (with productId)
      validatedData = createOrderSchema.parse(body);
      
      // Check for duplicate orders
      if (checkDuplicateOrder(validatedData.customerEmail, validatedData.customerPhone)) {
        return NextResponse.json(
          { error: 'Duplicate order detected. Please wait a few minutes before submitting again.' },
          { status: 429 }
        );
      }

      // Sanitize inputs
      validatedData.customerName = sanitizeInput(validatedData.customerName);
      validatedData.customerPhone = normalizePhone(validatedData.customerPhone);
      if (validatedData.businessName) {
        validatedData.businessName = sanitizeInput(validatedData.businessName);
      }
      if (validatedData.deliveryAddress) {
        validatedData.deliveryAddress = sanitizeInput(validatedData.deliveryAddress);
      }
      if (validatedData.notes) {
        validatedData.notes = sanitizeInput(validatedData.notes);
      }
    }

    // Handle contact form orders (no productId) vs regular orders
    let orderItems;
    let totalAmount = 0;

    if (isContactOrder) {
      // Contact form order - create items from vegetables array
      const contactData = validatedData as z.infer<typeof createContactOrderSchema>;
      orderItems = contactData.items.map((item) => ({
        productId: undefined, // Optional - no productId for contact form orders
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: 0, // Price to be confirmed later
        unit: item.unit,
        subtotal: 0, // Total to be calculated after pricing
      }));
      totalAmount = 0; // Total to be calculated after pricing
    } else {
      // Regular order with product items
      const productIds = (validatedData as z.infer<typeof createOrderSchema>).items
        .map((item: { productId?: string; quantity?: number; productName?: string }) => item.productId)
        .filter((id): id is string => !!id);
      
      if (productIds.length === 0) {
        return NextResponse.json(
          { error: 'At least one product is required' },
          { status: 400 }
        );
      }

      // Fetch products and calculate totals
      const products = await Product.find({
        _id: { $in: productIds },
        isAvailable: true,
        isDeleted: { $ne: true },
      }).lean();

      if (products.length !== productIds.length) {
        return NextResponse.json(
          { error: 'One or more products are not available' },
          { status: 400 }
        );
      }

      orderItems = (validatedData as z.infer<typeof createOrderSchema>).items.map((item: { productId?: string; quantity?: number; productName?: string }) => {
        if (item.productId) {
          const product = products.find((p) => p._id.toString() === item.productId);
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }
          return {
            productId: product._id,
            productName: product.name,
            quantity: item.quantity || 1,
            unitPrice: product.pricePerUnit,
            unit: product.unit,
            subtotal: product.pricePerUnit * (item.quantity || 1),
          };
        } else {
          // Fallback for items without productId
          return {
            productId: undefined,
            productName: item.productName || 'Custom Item',
            quantity: item.quantity || 1,
            unitPrice: 0,
            unit: 'item',
            subtotal: 0,
          };
        }
      });

      totalAmount = orderItems.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    }

    const orderNumber = generateOrderNumber();

    const order = new Order({
      orderNumber,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      businessName: validatedData.businessName,
      orderType: validatedData.orderType,
      status: 'pending',
      items: orderItems,
      totalAmount,
      deliveryAddress: validatedData.deliveryAddress,
      deliveryDate: validatedData.deliveryDate ? new Date(validatedData.deliveryDate) : undefined,
      notes: validatedData.notes,
    });

    await order.save();

    // Update stats when order is created
    await updateStatsOnOrderCreate(totalAmount);

    // Enqueue email notifications (async, non-blocking)
    try {
      await enqueueOrderPlaced(order);
    } catch (emailError) {
      // Log but don't fail the order creation
      console.error('Failed to enqueue order emails:', emailError);
    }

    return NextResponse.json(
      { order, message: 'Order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating order:', error);
    // Don't expose internal errors to prevent information leakage
    return NextResponse.json(
      { error: 'Failed to create order. Please try again later.' },
      { status: 500 }
    );
  }
}

