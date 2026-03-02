/**Node modules */
import * as z from 'zod'

export const updateVariantSchema = z.object({
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional()
})
export type T_UpdateVariantInput = z.infer<typeof updateVariantSchema>
