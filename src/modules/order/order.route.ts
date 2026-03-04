/**Node modules */
import { Router } from 'express'

/**Controllers */
import { orderController } from '@/modules/order/order.controller'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Schemas */
import { createOrderSchema } from '@/modules/order/order.schema'

const router = Router()

router.use(authenticate)
router.post('/', validate(createOrderSchema), orderController.createOrder)

export { router as orderRoutes }
