/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { cartController } from '@/modules/cart/cart.controller'

/**Schemas */
import { addItemSchema } from '@/modules/cart/cart.schema'

const router = Router()

router.post(
  '/items',
  authenticate,
  validate(addItemSchema),
  cartController.addItem
)

export { router as cartRoutes }
