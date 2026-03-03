/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { addressService } from '@/modules/address/address.service'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const addressController = {
  createAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addressService.createAddress(req.user!.sub, req.body)
      return success(res, {
        message: 'Create address success',
        statusCode: StatusCodes.CREATED,
        data: result
      })
    } catch (error) {
      console.error('Error create address', error)
      next(error)
    }
  }
}
