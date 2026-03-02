/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'
import { authorize } from '@/middlewares/authorize.middleware'

/**Controller */
import { productController } from '@/modules/product/product.controller'

/**Schemas */
import {
  createProductSchema,
  queryProductSchema,
  updateProductSchema
} from '@/modules/product/product.schema'

const router = Router()

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
  validate(updateProductSchema),
  productController.updateProduct
)
router.delete('/:id', productController.deleteProduct)

export { router as productRoutes }
