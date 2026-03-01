/**Node modules */
import { Router } from 'express'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'

/**Controllers */
import { categoryController } from '@/modules/category/category.controller'

/**Schemas */
import { createCategorySchema } from '@/modules/category/category.schema'

const router = Router()

router.post(
  '/',
  validate(createCategorySchema),
  categoryController.createCategory
)
router.get('/', categoryController.getAll)

export { router as categoryRoutes }
