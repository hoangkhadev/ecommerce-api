/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'

export const cartRepository = {
  findByUserId: async (userId: number) => {
    return prisma.cart.findUnique({ where: { userId } })
  },
  create: async (userId: number) => {
    return prisma.cart.create({ data: { userId } })
  },
  findItem: async (cartId: number, productVariantId: number) => {
    return prisma.cartItem.findUnique({
      where: {
        cartId_productVariantId: {
          cartId,
          productVariantId
        }
      }
    })
  },
  updateItem: async (id: number, quantity: number, total: any) => {
    return prisma.cartItem.update({
      where: { id },
      data: {
        quantity,
        total
      }
    })
  },
  createItem: async (
    cartId: number,
    productVariantId: number,
    quantity: number,
    total: any
  ) => {
    return prisma.cartItem.create({
      data: {
        cartId,
        productVariantId,
        quantity,
        total
      }
    })
  },
  async updateCartTotal(cartId: number) {
    const result = await prisma.cartItem.aggregate({
      where: { cartId },
      _sum: { total: true }
    })

    return prisma.cart.update({
      where: { id: cartId },
      data: {
        total: result._sum.total || 0
      }
    })
  },
  findCartDetail: async (userId: number) => {
    return prisma.cart.findUnique({
      where: { userId },

      include: {
        cartItems: {
          where: {
            variant: {
              deletedAt: null,
              product: {
                deletedAt: null,
                isActive: true
              }
            }
          },
          include: {
            variant: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true
                  }
                },
                images: {
                  where: {
                    isPrimary: true
                  },
                  select: {
                    imageUrl: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })
  }
}
