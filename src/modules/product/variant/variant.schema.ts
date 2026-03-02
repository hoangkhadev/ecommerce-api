/**Node modules */
import * as z from 'zod'

export const updateVariantSchema = z.object({
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional()
})
export const createVariantSchema = z.object({
  sku: z.string().min(1),
  price: z.number().positive(),
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

export type T_UpdateVariantInput = z.infer<typeof updateVariantSchema>
export type T_CreateVariantInput = z.infer<typeof createVariantSchema>
