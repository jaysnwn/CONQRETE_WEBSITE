import { z } from 'zod';

export const productVisibilitySchema = z.object({
  id: z.string().min(1),
  is_active: z.boolean(),
});

export const productSlugSchema = z.string().trim().min(1);
