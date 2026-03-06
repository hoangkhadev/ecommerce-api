/* eslint-disable @typescript-eslint/no-explicit-any */
/**Node modules */
import { StatusCodes } from 'http-status-codes'
import { ProductCode, VnpLocale, dateFormat } from 'vnpay'

/**Custom modules */
import { prisma } from '@/lib/prisma'
import { env } from '@/config/env'
import { vnpay } from '@/config/vnpay'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { PaymentStatus } from 'generated/prisma/enums'

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
          amount: order.total,
          txnRef: `${order.orderCode}-${Date.now()}`
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
        where: {
          orderId,
          OR: [
            { status: 'PENDING', expiredAt: { gt: new Date() } },
            { status: 'SUCCESS' }
          ]
        }
      })

      if (existedPayment) {
        if (existedPayment.status === 'PENDING') {
          return existedPayment.paymentUrl
        }
        throw new AppError('Payment already exists', StatusCodes.BAD_REQUEST)
      }

      const txnRef = `${order.orderCode}-${Date.now()}`

      const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: Math.round(Number(order.total)),
        vnp_IpAddr: ip!,
        vnp_TxnRef: txnRef,
        vnp_OrderInfo: `Thanh toan hoa don ${order.orderCode}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: env.VNP_RETURN_URL!,
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(new Date(Date.now() + 15 * 60 * 1000))
      })

      await tx.payment.create({
        data: {
          orderId,
          method: 'VNPAY',
          status: 'PENDING',
          amount: order.total,
          txnRef,
          paymentUrl: vnpayResponse,
          expiredAt: new Date(Date.now() + 15 * 60 * 1000)
        }
      })

      return vnpayResponse
    })
  },
  getVNPayPaymentReturn: async (paymentQueries: any) => {
    const verify = vnpay.verifyReturnUrl(paymentQueries)
    if (!verify.isVerified) {
      throw new AppError('Invalid VNPay signature', StatusCodes.BAD_REQUEST)
    }

    const { vnp_TxnRef } = verify
    const orderCode = vnp_TxnRef.substring(0, vnp_TxnRef.lastIndexOf('-'))
    const order = await prisma.order.findUnique({ where: { orderCode } })
    if (!order) {
      throw new AppError('Order not found', StatusCodes.NOT_FOUND)
    }

    let status: PaymentStatus = 'FAILED'
    if (verify.vnp_ResponseCode === '00') {
      status = 'SUCCESS'
    } else if (verify.vnp_ResponseCode === '24') {
      status = 'CANCELED'
    }

    await prisma.payment.update({
      where: { txnRef: vnp_TxnRef },
      data: {
        transactionId: verify.vnp_TransactionNo?.toString(),
        bankCode: verify.vnp_BankCode,
        responseCode: verify.vnp_ResponseCode.toString(),
        payDate: new Date(),
        responseRaw: paymentQueries,
        status
      }
    })

    if (status === 'SUCCESS') {
      await prisma.order.update({
        where: { orderCode },
        data: { status: 'APPROVED' }
      })
    }

    return {
      status: status === 'SUCCESS' ? 'success' : 'failed',
      orderCode
    }
  }
}
