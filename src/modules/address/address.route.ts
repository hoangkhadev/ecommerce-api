/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { addressController } from '@/modules/address/address.controller'

/**Schemas */
import {
  createAddressSchema,
  updateAddressSchema
} from '@/modules/address/address.schema'

const router = Router()

router.use(authenticate)
router.post('/', validate(createAddressSchema), addressController.createAddress)
router.get('/', addressController.getMyAddresses)
router.get('/:id', addressController.getDetail)
router.patch(
  '/:id',
  validate(updateAddressSchema),
  addressController.updateAddress
)

export { router as addressRoutes }
