import Inventory from '@/lib/db/models/Inventory';
import { IOrder } from '@/lib/db/models/Order';

export async function handleOrderStatusChange(
  order: IOrder,
  oldStatus: string,
  newStatus: string
) {
  // Reserve inventory when order is confirmed
  if (oldStatus !== 'confirmed' && newStatus === 'confirmed') {
    for (const item of order.items) {
      await Inventory.findOneAndUpdate(
        { productId: item.productId },
        {
          $inc: { reservedQuantity: item.quantity },
          $set: { lastUpdated: new Date() },
        },
        { upsert: true, new: true }
      );
    }
  }

  // Release inventory when order is cancelled
  if (oldStatus !== 'cancelled' && newStatus === 'cancelled') {
    for (const item of order.items) {
      const inventory = await Inventory.findOne({ productId: item.productId });
      if (inventory && inventory.reservedQuantity >= item.quantity) {
        inventory.reservedQuantity -= item.quantity;
        inventory.lastUpdated = new Date();
        await inventory.save();
      }
    }
  }
}

