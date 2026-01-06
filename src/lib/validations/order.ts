import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().optional(), // Optional for contact form orders
  quantity: z.number().positive('Quantity must be positive').optional(),
  productName: z.string().optional(), // For contact form orders without productId
  unit: z.string().optional(), // Unit for contact form orders
});

// Schema for contact form vegetable items
export const contactOrderItemSchema = z.object({
  productName: z.string().min(1, 'Product name is required').max(200, 'Product name is too long'),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
});

// Schema for contact form orders (no productId required)
export const createContactOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, 'Customer name is required')
    .max(200, 'Name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  customerEmail: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email is too long')
    .toLowerCase()
    .refine((email) => {
      // Block common spam domains
      const spamDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
      const domain = email.split('@')[1];
      return !spamDomains.some((spam) => domain.includes(spam));
    }, 'Please use a valid email address'),
  customerPhone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters'),
  businessName: z
    .string()
    .max(200, 'Business name is too long')
    .regex(/^[a-zA-Z0-9\s\-'.,&]+$/, 'Business name contains invalid characters')
    .optional(),
  orderType: z.enum(['bulk-wholesale', 'restaurant', 'grocery', 'individual', 'catering', 'csa']),
  items: z
    .array(contactOrderItemSchema)
    .min(1, 'At least one vegetable item is required'),
  deliveryAddress: z
    .string()
    .max(500, 'Address is too long')
    .regex(/^[a-zA-Z0-9\s\-\.,#\/]+$/, 'Address contains invalid characters')
    .optional(),
  deliveryDate: z.string().datetime().optional().or(z.literal('')),
  notes: z
    .string()
    .max(2000, 'Notes are too long')
    .optional(),
  // Honeypot field for bot detection (should be empty)
  website: z.string().max(0, 'Invalid field').optional(),
});

// Schema for orders with product items
export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(200, 'Name is too long'),
  customerEmail: z.string().email('Invalid email address').max(255, 'Email is too long'),
  customerPhone: z.string().min(1, 'Phone number is required').max(20, 'Phone number is too long'),
  businessName: z.string().max(200, 'Business name is too long').optional(),
  orderType: z.enum(['bulk-wholesale', 'restaurant', 'grocery', 'individual', 'catering', 'csa']),
  items: z
    .array(orderItemSchema)
    .min(1, 'Order must have at least one item'),
  deliveryAddress: z.string().max(500, 'Address is too long').optional(),
  deliveryDate: z.string().datetime().optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notes are too long').optional(),
});

export const updateOrderItemSchema = z.object({
  unitPrice: z.number().min(0, 'Unit price must be non-negative'),
  subtotal: z.number().min(0, 'Subtotal must be non-negative'),
});

export const updateOrderSchema = z.object({
  status: z
    .enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'])
    .optional(),
  deliveryAddress: z.string().max(500, 'Address is too long').optional(),
  deliveryDate: z.string().datetime().optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notes are too long').optional(),
  items: z
    .array(
      z.object({
        unitPrice: z.number().min(0, 'Unit price must be non-negative'),
        subtotal: z.number().min(0, 'Subtotal must be non-negative'),
      })
    )
    .optional(),
  totalAmount: z.number().min(0, 'Total amount must be non-negative').optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

