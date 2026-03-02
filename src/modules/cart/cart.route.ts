/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { cartController } from '@/modules/cart/cart.controller'

/**Schemas */
import { addItemSchema, updateCartItemSchema } from '@/modules/cart/cart.schema'

const router = Router()

router.post(
  '/items',
  authenticate,
  validate(addItemSchema),
  cartController.addItem
)

router.get('/', authenticate, cartController.getCart)
router.patch(
  '/items/:itemId',
  authenticate,
  validate(updateCartItemSchema),
  cartController.updateItem
)
router.delete('/items/:itemId', authenticate, cartController.deleteItem)

export { router as cartRoutes }
