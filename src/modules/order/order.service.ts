/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { prisma } from '@/lib/prisma'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Repositories */
import { orderRepository } from '@/modules/order/order.repository'

export const orderService = {
  createOrder: async (userId: number, addressId: number) => {
    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          cartItems: {
            include: {
              variant: true
            }
          }
        }
      })
      if (!cart || cart.cartItems.length === 0) {
        throw new AppError('Cart is empty', StatusCodes.BAD_REQUEST)
      }

      for (const item of cart.cartItems) {
        if (item.variant.stock < item.quantity) {
          throw new AppError(`Variant ${item.variant.sku} out of stock`)
        }
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      const address = await tx.address.findFirst({
        where: { id: addressId, userId }
      })
      if (!address) {
        throw new AppError('Address not found', StatusCodes.NOT_FOUND)
      }

      const order = await tx.order.create({
        data: {
          userId,
          orderCode: `ORD-${Date.now()}`,
          total: cart.total,
          addressId,
          phone: address.phone,
          firstName: address.firstName,
          lastName: address.lastName,
          province: address.province,
          ward: address.ward,
          detail: address.detail
        }
      })

      await tx.orderItem.createMany({
        data: cart.cartItems.map((item) => ({
          orderId: order.id,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.variant.price,
          total: item.total
        }))
      })

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      })

      await tx.cart.update({ where: { id: cart.id }, data: { total: 0 } })

      return order
    })
  },
  getUserOrders: async (userId: number) => {
    return orderRepository.findByUserId(userId)
  },
  getOrderDetail: async (userId: number, id: number) => {
    const order = await orderRepository.findDetail(id, userId)
    if (!order) {
      throw new AppError('Order not found', StatusCodes.NOT_FOUND)
    }

    return order
  }
}
