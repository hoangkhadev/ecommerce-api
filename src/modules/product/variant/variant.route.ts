/**Node modules */
import { Router } from 'express'

/**Controllers */
import { variantController } from '@/modules/product/variant/variant.controller'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'
import { authorize } from '@/middlewares/authorize.middleware'

/**Schemas */
import { updateVariantSchema } from '@/modules/product/variant/variant.schema'

const router = Router()

router.get('/:id', variantController.getDetail)
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  validate(updateVariantSchema),
  variantController.updateVariant
)
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  variantController.deleteVariant
)

export { router as variantRoutes }
