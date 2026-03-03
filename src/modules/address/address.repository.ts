/* eslint-disable @typescript-eslint/no-explicit-any */
/**Custom modules */
import { prisma } from '@/lib/prisma'

export const addressRepository = {
  create: async (data: any) => {
    return prisma.address.create({ data })
  },
  countAdressByUserId: async (userId: number) => {
    return prisma.address.count({ where: { userId } })
  },
  findByUserId: async (userId: number) => {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
    })
  },
  findById: async (id: number, userId: number) => {
    return prisma.address.findFirst({ where: { id, userId } })
  }
}
