import Stats from '@/lib/db/models/Stats';

/**
 * Update stats when a new order is created
 */
export async function updateStatsOnOrderCreate(amount: number): Promise<void> {
  try {
    const stats = await Stats.getStats();
    await stats.addOrder(amount);
  } catch (error) {
    console.error('Error updating stats on order create:', error);
    // Don't throw - stats update failure shouldn't break order creation
  }
}

/**
 * Update stats when order status changes
 */
export async function updateStatsOnStatusChange(
  oldStatus: string,
  newStatus: string,
  amount: number
): Promise<void> {
  try {
    const stats = await Stats.getStats();
    await stats.updateOrderStatus(oldStatus, newStatus, amount);
  } catch (error) {
    console.error('Error updating stats on status change:', error);
    // Don't throw - stats update failure shouldn't break status update
  }
}

/**
 * Update stats when order revenue is updated (e.g., price changes)
 */
export async function updateStatsOnRevenueChange(
  oldAmount: number,
  newAmount: number,
  orderStatus: string
): Promise<void> {
  try {
    const stats = await Stats.getStats();
    const difference = newAmount - oldAmount;
    
    // Update total revenue
    stats.totalRevenue += difference;
    
    // If order is delivered, also update delivered revenue
    if (orderStatus === 'delivered') {
      stats.deliveredRevenue += difference;
    }
    
    stats.lastUpdated = new Date();
    await stats.save();
  } catch (error) {
    console.error('Error updating stats on revenue change:', error);
    // Don't throw - stats update failure shouldn't break order update
  }
}

/**
 * Sync stats with actual order data (useful for migration or fixing discrepancies)
 */
export async function syncStats(): Promise<void> {
  try {
    const { default: Order } = await import('@/lib/db/models/Order');
    
    const orders = await Order.find().lean();
    
    const stats = await Stats.getStats();
    
    // Reset all counters
    stats.totalOrders = orders.length;
    stats.totalRevenue = 0;
    stats.deliveredRevenue = 0;
    stats.pendingOrders = 0;
    stats.confirmedOrders = 0;
    stats.deliveredOrders = 0;
    stats.cancelledOrders = 0;
    
    // Recalculate from orders
    orders.forEach((order) => {
      stats.totalRevenue += order.totalAmount;
      
      if (order.status === 'pending') stats.pendingOrders += 1;
      if (order.status === 'confirmed') stats.confirmedOrders += 1;
      if (order.status === 'delivered') {
        stats.deliveredOrders += 1;
        stats.deliveredRevenue += order.totalAmount;
      }
      if (order.status === 'cancelled') stats.cancelledOrders += 1;
    });
    
    stats.lastUpdated = new Date();
    await stats.save();
  } catch (error) {
    console.error('Error syncing stats:', error);
    throw error;
  }
}

