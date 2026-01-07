import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import { requireAuth } from '@/lib/auth/middleware';
import { updateOrderSchema } from '@/lib/validations/order';
import { isValidObjectId } from '@/lib/utils/security';
import { handleOrderStatusChange } from '@/lib/utils/orders';
import { updateStatsOnStatusChange, updateStatsOnRevenueChange } from '@/lib/utils/stats';
import { enqueueOrderStatus } from '@/lib/email/queue';
import { z } from 'zod';
import { OrderStatus } from '@/lib/db/models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    await connectDB();

    const body = await request.json();
    const validatedData = updateOrderSchema.parse(body);

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const oldStatus = order.status;
    const oldTotalAmount = order.totalAmount;

    // Handle status change and inventory management
    if (validatedData.status && validatedData.status !== order.status) {
      await handleOrderStatusChange(order, order.status, validatedData.status);
      order.status = validatedData.status as OrderStatus;
    }

    if (validatedData.deliveryAddress !== undefined) {
      order.deliveryAddress = validatedData.deliveryAddress;
    }

    if (validatedData.deliveryDate) {
      order.deliveryDate = new Date(validatedData.deliveryDate);
    }

    if (validatedData.notes !== undefined) {
      order.notes = validatedData.notes;
    }

    // Handle item price updates (for contact form orders)
    if (validatedData.items && Array.isArray(validatedData.items)) {
      if (validatedData.items.length !== order.items.length) {
        return NextResponse.json(
          { error: 'Items array length mismatch' },
          { status: 400 }
        );
      }

      // Update item prices and subtotals
      const itemsToUpdate = validatedData.items;
      order.items = order.items.map((item, index) => {
        const updatedItem = itemsToUpdate[index];
        return {
          ...item,
          unitPrice: updatedItem.unitPrice,
          subtotal: updatedItem.subtotal,
        };
      });

      // Recalculate total amount
      order.totalAmount = order.items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    // Update total amount if provided directly
    if (validatedData.totalAmount !== undefined) {
      order.totalAmount = validatedData.totalAmount;
    }

    await order.save();

    // Update stats for status change
    if (validatedData.status && validatedData.status !== oldStatus) {
      await updateStatsOnStatusChange(oldStatus, validatedData.status, order.totalAmount);
      
      // Enqueue status notification email (async, non-blocking)
      try {
        await enqueueOrderStatus(order, validatedData.status);
      } catch (emailError) {
        console.error('Failed to enqueue status email:', emailError);
      }
    }

    // Update stats for revenue change (when prices are updated)
    const newTotalAmount = order.totalAmount;
    if (newTotalAmount !== oldTotalAmount) {
      await updateStatsOnRevenueChange(oldTotalAmount, newTotalAmount, order.status);
    }

    return NextResponse.json(order.toObject());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}


