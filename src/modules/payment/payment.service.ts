/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { prisma } from '@/lib/prisma'

/**Api error */
import { AppError } from '@/errors/AppError'

export const paymentService = {
  createCODPayment: async (userId: number, orderId: number) => {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirst({ where: { id: orderId, userId } })
      if (!order) {
        throw new AppError('Order not found', StatusCodes.NOT_FOUND)
      }

      if (order.status !== 'PENDING') {
        throw new AppError('Order already processed', StatusCodes.BAD_REQUEST)
      }

      const existedPayment = await tx.payment.findFirst({
        where: { orderId, status: { in: ['PENDING', 'SUCCESS'] } }
      })
      if (existedPayment) {
        throw new AppError('Payment already exists', StatusCodes.BAD_REQUEST)
      }

      const payment = await tx.payment.create({
        data: {
          orderId,
          method: 'COD',
          status: 'SUCCESS',
          amount: order.total
        }
      })

      await tx.order.update({
        where: { id: orderId },
        data: { status: 'APPROVED' }
      })

      return payment
    })
  }
}
