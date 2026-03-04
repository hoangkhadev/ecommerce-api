/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { orderService } from '@/modules/order/order.service'

/**Types */
import type { NextFunction, Request, Response } from 'express'

export const orderController = {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.createOrder(
        req.user!.sub,
        req.body.addressId
      )
      return success(res, {
        message: 'Create order success',
        statusCode: StatusCodes.CREATED,
        data: result
      })
    } catch (error) {
      console.error('Error create order: ', error)
      next(error)
    }
  },
  getUserOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.getUserOrders(req.user!.sub)
      return success(res, {
        message: 'Get user orders success',
        statusCode: StatusCodes.CREATED,
        data: result
      })
    } catch (error) {
      console.error('Error get user orders: ', error)
      next(error)
    }
  }
}
