/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { paymentController } from '@/modules/payment/payment.controller'

/**Schemas */
import { createPaymentSchema } from '@/modules/payment/payment.schema'

const router = Router()

router.use(authenticate)
router.post(
  '/cod',
  validate(createPaymentSchema),
  paymentController.createCODPayment
)

export { router as paymentRoutes }
