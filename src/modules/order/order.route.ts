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
router.get('/my-orders', orderController.getUserOrders)
router.get('/:id', orderController.getOrderDetail)
router.patch('/:id/cancel', orderController.cancelOrder)

export { router as orderRoutes }
