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
  '/cod/create',
  validate(createPaymentSchema),
  paymentController.createCODPayment
)
router.post(
  '/vnpay/create',
  validate(createPaymentSchema),
  paymentController.createVNPayPayment
)
router.get('/vnpay/return', paymentController.getVNPayPaymentReturn)

export { router as paymentRoutes }
