/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { addressController } from '@/modules/address/address.controller'

/**Schemas */
import { createAddressSchema } from '@/modules/address/address.schema'

const router = Router()

router.use(authenticate)
router.post('/', validate(createAddressSchema), addressController.createAddress)
router.get('/', addressController.getMyAddresses)

export { router as addressRoutes }
