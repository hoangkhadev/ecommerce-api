/**Node modules */
import * as z from 'zod'

export const registerSchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  phone: z.string().regex(/^(0)[0-9]{9}$/),
  password: z.string().min(8).max(120)
})

export type T_RegisterInput = z.infer<typeof registerSchema>
