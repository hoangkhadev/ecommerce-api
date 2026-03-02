/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { variantService } from '@/modules/product/variant/variant.service'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const variantController = {
  getDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const variant = await variantService.getDetail(id)
      return success(res, {
        message: 'Get product variant success',
        data: variant
      })
    } catch (error) {
      console.error('Error get product variant: ', error)
      next(error)
    }
  },
  updateVariant: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const variant = await variantService.updateVariant(id, req.body)
      return success(res, {
        message: 'Update product variant success',
        data: variant
      })
    } catch (error) {
      console.error('Error update product variant: ', error)
      next(error)
    }
  },
  deleteVariant: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      await variantService.deleteVariant(id)
      return success(res, {
        message: 'Delete product variant success'
      })
    } catch (error) {
      console.error('Error delete product variant: ', error)
      next(error)
    }
  },
  createVariant: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const variant = await variantService.createVariant(id, req.body)
      return success(res, {
        message: 'Create product variant success',
        statusCode: StatusCodes.CREATED,
        data: variant
      })
    } catch (error) {
      console.error('Error create product variant: ', error)
      next(error)
    }
  }
}
