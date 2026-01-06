import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { requireAuth } from '@/lib/auth/middleware';
import Stats from '@/lib/db/models/Stats';
import Product from '@/lib/db/models/Product';
import Inventory from '@/lib/db/models/Inventory';

export async function GET(request: NextRequest) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    await connectDB();

    // Get stats from Stats model and other data in parallel
    const [stats, totalProducts, inventoryItems] = await Promise.all([
      Stats.getStats(),
      Product.countDocuments({ isDeleted: { $ne: true } }),
      Inventory.find().lean(),
    ]);

    // Calculate low stock items
    const lowStockItems = inventoryItems.filter(
      (item) => item.availableQuantity <= item.lowStockThreshold
    ).length;

    return NextResponse.json({
      totalOrders: stats.totalOrders,
      totalProducts,
      lowStockItems,
      totalRevenue: stats.deliveredRevenue, // Use delivered revenue for dashboard
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

