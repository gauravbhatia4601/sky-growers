import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Product name is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  category: z.string().min(1, 'Category is required').max(100, 'Category is too long'),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  pricePerUnit: z.number().positive('Price must be positive'),
  unit: z.enum(['kg', 'lbs', 'piece'], {
    errorMap: () => ({ message: 'Unit must be kg, lbs, or piece' }),
  }),
  isAvailable: z.boolean().optional().default(true),
  season: z.string().max(100, 'Season is too long').optional(),
});

export const updateProductSchema = createProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided for update',
  }
);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

