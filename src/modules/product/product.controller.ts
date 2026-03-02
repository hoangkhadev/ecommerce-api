/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { productService } from '@/modules/product/product.service'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const productController = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct(req.body)
      return success(res, {
        message: 'Create product success',
        statusCode: StatusCodes.CREATED,
        data: product
      })
    } catch (error) {
      console.error('Error create product: ', error)
      next(error)
    }
  }
}
