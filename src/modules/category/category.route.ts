/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'
import { authorize } from '@/middlewares/authorize.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'

/**Controllers */
import { categoryController } from '@/modules/category/category.controller'

/**Schemas */
import { createCategorySchema } from '@/modules/category/category.schema'

const router = Router()

router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  validate(createCategorySchema),
  categoryController.createCategory
)
router.get('/', categoryController.getAll)
router.get('/:slug', categoryController.getBySlug)
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  categoryController.updateCategory
)
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  categoryController.deleteCategory
)

export { router as categoryRoutes }
