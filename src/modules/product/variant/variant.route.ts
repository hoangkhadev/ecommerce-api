/**Node modules */
import { Router } from 'express'

/**Controllers */
import { variantController } from '@/modules/product/variant/variant.controller'

const router = Router()

router.get('/:id', variantController.getDetail)

export { router as variantRoutes }
