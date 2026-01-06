import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import { requireAuth } from '@/lib/auth/middleware';
import { isValidObjectId } from '@/lib/utils/security';
import { handleOrderStatusChange } from '@/lib/utils/orders';
import { updateStatsOnStatusChange } from '@/lib/utils/stats';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']),
});

export async function PATCH(
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
    const { status } = updateStatusSchema.parse(body);

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const oldStatus = order.status;

    // Handle status change and inventory management
    if (status !== oldStatus) {
      await handleOrderStatusChange(order, oldStatus, status);
      order.status = status;
      await order.save();
      
      // Update stats when order status changes
      await updateStatsOnStatusChange(oldStatus, status, order.totalAmount);
    }

    return NextResponse.json(order.toObject());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}


