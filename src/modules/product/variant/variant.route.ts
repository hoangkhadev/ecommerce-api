/**Node modules */
import { Router } from 'express'

/**Controllers */
import { variantController } from '@/modules/product/variant/variant.controller'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'

/**Schemas */
import { updateVariantSchema } from '@/modules/product/variant/variant.schema'

const router = Router()

router.get('/:id', variantController.getDetail)
router.patch(
  '/:id',
  validate(updateVariantSchema),
  variantController.updateVariant
)
export { router as variantRoutes }
