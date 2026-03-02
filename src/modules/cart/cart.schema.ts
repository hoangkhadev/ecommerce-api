/**Node modules */
import * as z from 'zod'

export const addItemSchema = z.object({
  productVariantId: z.number(),
  quantity: z.number().min(1)
})

export type T_AddItemInput = z.infer<typeof addItemSchema>
