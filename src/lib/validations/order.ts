import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().positive('Quantity must be positive'),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(200, 'Name is too long'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Phone number is required').max(20, 'Phone number is too long'),
  businessName: z.string().max(200, 'Business name is too long').optional(),
  orderType: z.enum(['bulk-wholesale', 'restaurant', 'grocery', 'individual', 'catering', 'csa'], {
    errorMap: () => ({ message: 'Invalid order type' }),
  }),
  items: z
    .array(orderItemSchema)
    .min(1, 'Order must have at least one item'),
  deliveryAddress: z.string().max(500, 'Address is too long').optional(),
  deliveryDate: z.string().datetime().optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notes are too long').optional(),
});

export const updateOrderSchema = z.object({
  status: z
    .enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], {
      errorMap: () => ({ message: 'Invalid order status' }),
    })
    .optional(),
  deliveryAddress: z.string().max(500, 'Address is too long').optional(),
  deliveryDate: z.string().datetime().optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notes are too long').optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

