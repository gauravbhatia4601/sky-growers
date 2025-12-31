import { z } from 'zod';

export const updateInventorySchema = z.object({
  quantity: z.number().min(0, 'Quantity cannot be negative').optional(),
  reservedQuantity: z.number().min(0, 'Reserved quantity cannot be negative').optional(),
  lowStockThreshold: z.number().min(0, 'Low stock threshold cannot be negative').optional(),
});

export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;

