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
  }
}
