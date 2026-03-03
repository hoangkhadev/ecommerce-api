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
  },
  getMyAddresses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addressService.getMyAddresses(req.user!.sub)
      return success(res, {
        message: 'Get address success',
        data: result
      })
    } catch (error) {
      console.error('Error get address', error)
      next(error)
    }
  },
  getDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const result = await addressService.getDetail(id, req.user!.sub)
      return success(res, {
        message: 'Get detail address success',
        data: result
      })
    } catch (error) {
      console.error('Error get detail address', error)
      next(error)
    }
  },
  updateAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const result = await addressService.updateAddress(
        req.user!.sub,
        id,
        req.body
      )
      return success(res, {
        message: 'Update address success',
        data: result
      })
    } catch (error) {
      console.error('Error update address', error)
      next(error)
    }
  }
}
