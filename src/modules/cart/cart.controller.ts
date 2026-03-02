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
  },
  getCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await cartService.getCart(req.user!.sub)
      return success(res, {
        message: 'Get cart success',
        data: result
      })
    } catch (error) {
      console.error('Error get cart: ', error)
      next(error)
    }
  },
  updateItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemId = Number(req.params.itemId)
      const result = await cartService.updateItem(
        req.user!.sub,
        itemId,
        req.body.quantity
      )
      return success(res, {
        message: 'Update cart item success',
        data: result
      })
    } catch (error) {
      console.error('Error update cart item: ', error)
      next(error)
    }
  }
}
