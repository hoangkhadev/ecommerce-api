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
      orderBy: [{ createdAt: 'desc' }]
    })
  },
  findById: async (id: number, userId: number) => {
    return prisma.address.findFirst({ where: { id, userId } })
  },
  updateIsDefaultToFalseByUserId: async (userId: number) => {
    return prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false }
    })
  },
  update: async (id: number, data: any) => {
    return prisma.address.update({
      where: { id },
      data
    })
  },
  delete: async (id: number) => {
    return prisma.address.delete({
      where: { id }
    })
  },
  findFirstByUserId: async (userId: number) => {
    return prisma.address.findFirst({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    })
  }
}
