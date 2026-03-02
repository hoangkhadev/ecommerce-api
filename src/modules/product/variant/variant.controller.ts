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
  }
}
