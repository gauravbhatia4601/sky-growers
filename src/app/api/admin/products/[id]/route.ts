import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Product from '@/lib/db/models/Product';
import { requireAuth } from '@/lib/auth/middleware';
import { updateProductSchema } from '@/lib/validations/product';
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
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await connectDB();

    // Allow fetching deleted products by ID (needed for orders/inventory)
    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
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
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await connectDB();

    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Prevent updating isDeleted through PUT - use DELETE endpoint instead
    if ('isDeleted' in validatedData) {
      delete (validatedData as any).isDeleted;
    }
    if ('deletedAt' in validatedData) {
      delete (validatedData as any).deletedAt;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { ...validatedData, isDeleted: { $ne: true } },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found or has been deleted' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await connectDB();

    // Check if product exists and is not already deleted
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check for dependencies
    const { default: Inventory } = await import('@/lib/db/models/Inventory');
    const { default: Order } = await import('@/lib/db/models/Order');

    const [hasInventory, hasOrders] = await Promise.all([
      Inventory.exists({ productId: id }),
      Order.exists({ 'items.productId': id }),
    ]);

    if (hasInventory || hasOrders) {
      // Soft delete: mark as deleted instead of removing
      product.isDeleted = true;
      product.deletedAt = new Date();
      product.isAvailable = false; // Also mark as unavailable
      await product.save();

      return NextResponse.json({
        message: 'Product archived successfully (soft deleted due to dependencies)',
        isSoftDelete: true,
        hasInventory: !!hasInventory,
        hasOrders: !!hasOrders,
      });
    }

    // No dependencies - soft delete anyway for safety
    product.isDeleted = true;
    product.deletedAt = new Date();
    product.isAvailable = false;
    await product.save();

    return NextResponse.json({
      message: 'Product archived successfully',
      isSoftDelete: true,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

