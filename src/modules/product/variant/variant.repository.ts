/* eslint-disable @typescript-eslint/no-explicit-any */
/**Custom modules */
import { prisma } from '@/lib/prisma'

export const variantRepository = {
  findById: async (id: number) => {
    return prisma.productVariant.findFirst({
      where: { id, deletedAt: null, product: { deletedAt: null } },
      include: {
        product: true,
        images: true
      }
    })
  },
  update: async (id: number, data: any) => {
    return prisma.productVariant.update({ where: { id }, data })
  },
  softDelete: async (id: number) => {
    return prisma.productVariant.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    })
  }
}
