/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { cartService } from '@/modules/cart/cart.service'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const cartController = {
  addItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await cartService.addItem(req.user!.sub, req.body)
      return success(res, {
        message: 'Add item to cart success',
        data: result
      })
    } catch (error) {
      console.error('Error add item to cart: ', error)
      next(error)
    }
  }
}
