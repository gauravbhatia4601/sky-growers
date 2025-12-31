import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Inventory from '@/lib/db/models/Inventory';
import { requireAuth } from '@/lib/auth/middleware';
import { updateInventorySchema } from '@/lib/validations/inventory';
import { isValidObjectId } from '@/lib/utils/security';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid inventory ID' }, { status: 400 });
    }

    await connectDB();

    const inventory = await Inventory.findById(id)
      .populate('productId', 'name category imageUrl unit')
      .lean();

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 });
    }

    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
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
      return NextResponse.json({ error: 'Invalid inventory ID' }, { status: 400 });
    }

    await connectDB();

    const body = await request.json();
    const validatedData = updateInventorySchema.parse(body);

    const inventory = await Inventory.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        lastUpdated: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('productId', 'name category imageUrl unit')
      .lean();

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 });
    }

    return NextResponse.json(inventory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating inventory:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}

