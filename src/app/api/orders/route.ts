import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';
import mongoose from 'mongoose';
import { createOrderSchema } from '@/lib/validations/order';
import { rateLimit } from '@/lib/utils/security';
import { z } from 'zod';

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SG-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    if (!rateLimit(request, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    await connectDB();

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Handle placeholder orders (from contact form without product selection)
    // For now, create a generic order item with $0 total
    let orderItems;
    let totalAmount = 0;

    if (validatedData.items.length === 1 && validatedData.items[0].productId === '000000000000000000000000') {
      // This is a placeholder order from contact form
      orderItems = [{
        productId: new mongoose.Types.ObjectId(),
        productName: 'Order Inquiry - To be confirmed',
        quantity: 1,
        unitPrice: 0,
        unit: 'order',
        subtotal: 0,
      }];
      totalAmount = 0;
    } else {
      // Fetch products and calculate totals for real orders
      const productIds = validatedData.items.map((item) => item.productId);
      const products = await Product.find({
        _id: { $in: productIds },
        isAvailable: true,
      }).lean();

      if (products.length !== productIds.length) {
        return NextResponse.json(
          { error: 'One or more products are not available' },
          { status: 400 }
        );
      }

      orderItems = validatedData.items.map((item) => {
        const product = products.find((p) => p._id.toString() === item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        return {
          productId: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.pricePerUnit,
          unit: product.unit,
          subtotal: product.pricePerUnit * item.quantity,
        };
      });

      totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
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

    return NextResponse.json(
      { order, message: 'Order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

