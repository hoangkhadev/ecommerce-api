/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'
import { authorize } from '@/middlewares/authorize.middleware'

/**Controller */
import { productController } from '@/modules/product/product.controller'
import { variantController } from '@/modules/product/variant/variant.controller'

/**Schemas */
import {
  createProductSchema,
  queryProductSchema,
  updateProductSchema
} from '@/modules/product/product.schema'

/**Routes */
import { variantRoutes } from '@/modules/product/variant/variant.route'
import { createVariantSchema } from '@/modules/product/variant/variant.schema'

const router = Router()

router.post(
  '/:id/variants',
  authenticate,
  authorize(['ADMIN']),
  validate(createVariantSchema),
  variantController.createVariant
)
router.use('/variants', variantRoutes)
router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  validate(createProductSchema),
  productController.createProduct
)
router.get(
  '/',
  validate(queryProductSchema, 'query'),
  productController.getAllProduct
)
router.get('/:id', productController.getDetailProduct)
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  validate(updateProductSchema),
  productController.updateProduct
)
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  productController.deleteProduct
)

export { router as productRoutes }
