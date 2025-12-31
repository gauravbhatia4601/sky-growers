import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Inventory from '@/lib/db/models/Inventory';
import Product from '@/lib/db/models/Product';
import { requireAuth } from '@/lib/auth/middleware';
import { updateInventorySchema } from '@/lib/validations/inventory';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const lowStockOnly = searchParams.get('lowStockOnly') === 'true';

    const query: any = {};

    const inventoryItems = await Inventory.find(query)
      .populate('productId', 'name category imageUrl unit')
      .sort({ lastUpdated: -1 })
      .lean();

    let filteredItems = inventoryItems;

    if (lowStockOnly) {
      filteredItems = inventoryItems.filter((item: any) => {
        const available = item.quantity - item.reservedQuantity;
        return available <= item.lowStockThreshold;
      });
    }

    return NextResponse.json({ inventory: filteredItems });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    await connectDB();

    const body = await request.json();
    const { productId, ...updateData } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const validatedData = updateInventorySchema.parse(updateData);

    const inventory = await Inventory.findOneAndUpdate(
      { productId },
      {
        ...validatedData,
        lastUpdated: new Date(),
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    )
      .populate('productId', 'name category imageUrl unit')
      .lean();

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

