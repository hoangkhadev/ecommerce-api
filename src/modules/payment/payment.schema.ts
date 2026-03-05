/**Node modules */
import * as z from 'zod'

export const createPaymentSchema = z.object({
  orderId: z.number()
})
