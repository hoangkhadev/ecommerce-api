/**Node modules */
import * as z from 'zod'

export const updateUserSchema = z.object({
  email: z.string().trim().email().optional(),
  firstName: z.string().min(1).max(60).optional(),
  lastName: z.string().min(1).max(60).optional(),
  phone: z
    .string()
    .regex(/^(0)[0-9]{9}$/)
    .optional()
})

export type T_UpdateUserInput = z.infer<typeof updateUserSchema>
