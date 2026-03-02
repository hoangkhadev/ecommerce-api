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

export type T_CreateProductInput = z.infer<typeof createProductSchema>
