/**Node modules */
import * as z from 'zod'

export const createOrderSchema = z.object({
  addressId: z.number()
})

export type T_CreateOrderInput = z.infer<typeof createOrderSchema>
