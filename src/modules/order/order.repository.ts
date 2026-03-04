import { prisma } from '@/lib/prisma'

export const orderRepository = {
  findByUserId: async (userId: number) => {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })
  },
  findDetail: async (orderId: number, userId: number) => {
    return prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                product: true
              }
            }
          }
        },
        payment: true
      }
    })
  }
}
