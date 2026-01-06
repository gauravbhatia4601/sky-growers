'use client';

import { useEffect, useState } from 'react';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import Link from 'next/link';
import { Package, ShoppingCart, Box, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
  totalOrders: number;
  totalProducts: number;
  lowStockItems: number;
  totalRevenue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalProducts: 0,
    lowStockItems: 0,
    totalRevenue: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your farm operations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/orders">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {statsLoading ? '...' : stats.totalOrders.toLocaleString()}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Link>

        {/* <Link href="/admin/products">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {statsLoading ? '...' : stats.totalProducts.toLocaleString()}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Link> */}

        {/* <Link href="/admin/inventory">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {statsLoading ? '...' : stats.lowStockItems.toLocaleString()}
                </p>
              </div>
              <Box className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </Link> */}

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {statsLoading ? '...' : `$${stats.totalRevenue.toFixed(2)}`}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Quick Actions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {/* <Link href="/admin/products/new">
            <Button>Add New Product</Button>
          </Link> */}
          <Link href="/admin/orders">
            <Button variant="outline">View All Orders</Button>
          </Link>
          {/* <Link href="/admin/inventory">
            <Button variant="outline">Manage Inventory</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

