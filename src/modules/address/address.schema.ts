/**Node modules */
import * as z from 'zod'

export const createAddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(9),
  province: z.string(),
  ward: z.string(),
  detail: z.string(),
  isDefault: z.boolean().optional()
})

export type T_CreateAddressInput = z.infer<typeof createAddressSchema>
