import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import { requireAuth } from '@/lib/auth/middleware';
import { updateOrderSchema } from '@/lib/validations/order';
import { isValidObjectId } from '@/lib/utils/security';
import { handleOrderStatusChange } from '@/lib/utils/orders';
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

    await order.save();

    return NextResponse.json(order.toObject());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
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


