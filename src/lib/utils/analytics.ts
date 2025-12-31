import { Order, OrderStatus } from '@/lib/db/models/Order';
import { AnalyticsData } from '@/types';

export async function calculateAnalytics(
  startDate: Date,
  endDate: Date,
  period: 'daily' | 'weekly' | 'monthly' = 'monthly'
): Promise<AnalyticsData> {
  const orders = await Order.find({
    createdAt: { $gte: startDate, $lte: endDate },
  }).lean();

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Calculate orders by status
  const ordersByStatus: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    delivered: 0,
    cancelled: 0,
  };

  orders.forEach((order) => {
    ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
  });

  // Calculate top products
  const productMap = new Map<string, { name: string; quantity: number; revenue: number }>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const productId = item.productId.toString();
      const existing = productMap.get(productId) || { name: item.productName, quantity: 0, revenue: 0 };
      existing.quantity += item.quantity;
      existing.revenue += item.subtotal;
      productMap.set(productId, existing);
    });
  });

  const topProducts = Array.from(productMap.entries())
    .map(([productId, data]) => ({
      productId,
      productName: data.name,
      totalQuantity: data.quantity,
      totalRevenue: data.revenue,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10);

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    period,
    startDate,
    endDate,
    topProducts,
    ordersByStatus,
  };
}

