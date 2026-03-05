/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { paymentService } from '@/modules/payment/payment.service'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const paymentController = {
  createCODPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await paymentService.createCODPayment(
        req.user!.sub,
        req.body.orderId
      )
      return success(res, { message: 'Create payment success', data: payment })
    } catch (error) {
      console.error('Error create payment: ', error)
      next(error)
    }
  }
}
