/**Node modules */
import { prisma } from '@/lib/prisma'

/**Types */
import type { T_RegisterInput } from '@/modules/auth/auth.schema'

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findFirst({ where: { email } })
  },
  findByPhone: async (phone: string) => {
    return prisma.user.findFirst({ where: { phone } })
  },
  create: async (data: T_RegisterInput) => {
    return prisma.user.create({ data })
  }
}
