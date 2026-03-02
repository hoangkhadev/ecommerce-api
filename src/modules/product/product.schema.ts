/**Node modules */
import * as z from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3).max(120),
  description: z.string().optional(),
  categoryId: z.number().int(),
  variants: z
    .array(
      z.object({
        sku: z.string(),
        price: z.number(),
        stock: z.number().int().min(0),
        images: z
          .array(
            z.object({
              imageUrl: z.string().url(),
              isPrimary: z.boolean().optional()
            })
          )
          .optional()
      })
    )
    .min(1)
})
export const queryProductSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  search: z.string().optional(),
  categoryId: z.coerce.number().optional()
})
export const updateProductSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  description: z.string().optional(),
  categoryId: z.number().optional(),
  isActive: z.boolean().optional()
})

export type T_CreateProductInput = z.infer<typeof createProductSchema>
export type T_QueryProductInput = z.infer<typeof queryProductSchema>
export type T_UpdateProductInput = z.infer<typeof updateProductSchema>
