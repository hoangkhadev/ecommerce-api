import { prisma } from '@/lib/prisma'

export const userRepository = {
  findById: async (userId: number) => {
    return prisma.user.findUnique({ where: { id: userId } })
  }
}
