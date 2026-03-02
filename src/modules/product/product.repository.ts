/* eslint-disable @typescript-eslint/no-explicit-any */
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
  },
  findMany: async (query: any) => {
    const { skip, take, search, categoryId } = query
    return prisma.product.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        name: search ? { contains: search, mode: 'insensitive' } : undefined,
        categoryId: categoryId || undefined
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        variants: {
          where: { deletedAt: null },
          include: {
            images: true
          }
        }
      }
    })
  },
  count: async (query: any) => {
    return prisma.product.count({
      where: {
        deletedAt: null,
        isActive: true,
        categoryId: query.categoryId || undefined
      }
    })
  },
  findById: async (id: number) => {
    return prisma.product.findFirst({
      where: { id, deletedAt: null, isActive: true },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          include: { images: true }
        }
      }
    })
  },
  findByIdUpdate: async (id: number) => {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          include: { images: true }
        }
      }
    })
  },
  update: async (id: number, data: any) => {
    return prisma.product.update({ where: { id }, data })
  }
}
