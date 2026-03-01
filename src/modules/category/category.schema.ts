/**Node modules */
import * as z from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(2),
  parentId: z.number().optional()
})

export type T_CreateCategoryInput = z.infer<typeof createCategorySchema>
