import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Product from '@/lib/db/models/Product';
import { requireAuth } from '@/lib/auth/middleware';
import { isValidObjectId } from '@/lib/utils/security';

export async function POST(
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

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!product.isDeleted) {
      return NextResponse.json(
        { error: 'Product is not deleted' },
        { status: 400 }
      );
    }

    // Restore the product
    product.isDeleted = false;
    product.deletedAt = undefined;
    await product.save();

    return NextResponse.json({
      message: 'Product restored successfully',
      product: product.toObject(),
    });
  } catch (error) {
    console.error('Error restoring product:', error);
    return NextResponse.json(
      { error: 'Failed to restore product' },
      { status: 500 }
    );
  }
}

