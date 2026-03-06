/**Node modules */
import { StatusCodes } from 'http-status-codes'
import { ProductCode, VnpLocale, dateFormat } from 'vnpay'

/**Custom modules */
import { prisma } from '@/lib/prisma'
import { env } from '@/config/env'
import { vnpay } from '@/config/vnpay'

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
  },
  createVNPayPayment: async (
    userId: number,
    orderId: number,
    ip: string | undefined
  ) => {
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

      await tx.payment.create({
        data: {
          orderId,
          method: 'VNPAY',
          status: 'PENDING',
          amount: order.total
        }
      })

      const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: Math.round(Number(order.total)),
        vnp_IpAddr: ip!,
        vnp_TxnRef: `${order.orderCode}-${Date.now()}`,
        vnp_OrderInfo: `Thanh toan hoa don ${order.orderCode}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: env.VNP_RETURN_URL!,
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(new Date(Date.now() + 15 * 60 * 1000))
      })

      return vnpayResponse
    })
  }
}
