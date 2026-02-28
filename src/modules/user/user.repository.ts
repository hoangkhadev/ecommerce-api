import { prisma } from '@/lib/prisma'

export const userRepository = {
  findById: async (userId: number) => {
    return prisma.user.findUnique({ where: { id: userId } })
  },
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } })
  },
  findByPhone: async (phone: string) => {
    return prisma.user.findUnique({ where: { phone } })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateById: async (userId: number, data: any) => {
    return prisma.user.update({
      where: { id: userId },
      data,
      omit: { password: true }
    })
  }
}
