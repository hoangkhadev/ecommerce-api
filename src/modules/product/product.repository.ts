/**Custom modules */
import { prisma } from '@/lib/prisma'
import { T_CreateProductInput } from '@/modules/product/product.schema'

export const productRepository = {
  create: async (data: T_CreateProductInput) => {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,

        variants: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: data.variants.map((variant: any) => ({
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            images: variant.images ? { create: variant.images } : undefined
          }))
        }
      },
      include: {
        variants: {
          include: { images: true }
        }
      }
    })
  },
  findSkuExits: async (skus: string[]) => {
    return prisma.productVariant.findMany({
      where: {
        sku: { in: skus }
      },
      select: { sku: true }
    })
  }
}
