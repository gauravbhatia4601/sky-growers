import { z } from 'zod';
import { PRODUCT_CATEGORIES, PRODUCT_SEASONS } from '@/lib/product.config';

const categoryEnum = z.enum(PRODUCT_CATEGORIES as unknown as [string, ...string[]]);
const seasonEnum = z.enum(PRODUCT_SEASONS as unknown as [string, ...string[]]);

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Product name is too long'),
  description: z.string().max(5000, 'Description is too long').optional(),
  category: categoryEnum,
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  pricePerUnit: z.number().positive('Price must be positive'),
  unit: z.enum(['kg', 'lbs', 'piece']),
  isAvailable: z.boolean().optional().default(true),
  season: seasonEnum.optional(),
  isNew: z.boolean().optional().default(false),
  isPopular: z.boolean().optional().default(false),
});

export const updateProductSchema = createProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided for update',
  }
);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

