/**Node modules */
import * as z from 'zod'

export const addItemSchema = z.object({
  productVariantId: z.number(),
  quantity: z.number().min(1)
})
export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0)
})

export type T_AddItemInput = z.infer<typeof addItemSchema>
export type T_UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
