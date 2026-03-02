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
  },
  getAllProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.getAllProduct(req.validatedQuery)
      return success(res, {
        message: 'Get all product success',
        data: result
      })
    } catch (error) {
      console.error('Error get all product: ', error)
      next(error)
    }
  },
  getDetailProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const product = await productService.getDetailProduct(id)
      return success(res, {
        message: 'Get product success',
        data: product
      })
    } catch (error) {
      console.error('Error get detail product: ', error)
      next(error)
    }
  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const product = await productService.updateProduct(id, req.body)
      return success(res, {
        message: 'Update product success',
        data: product
      })
    } catch (error) {
      console.error('Error update product: ', error)
      next(error)
    }
  }
}
