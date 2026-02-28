/**Node modules */
import { Router } from 'express'

/**Controllers */
import { userController } from '@/modules/user/user.controller'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'
import { validate } from '@/middlewares/validate.middleware'

/**Schemas */
import { updateUserSchema } from '@/modules/user/user.schema'

const router = Router()

router.get('/me', authenticate, userController.getProfile)
router.patch(
  '/me',
  authenticate,
  validate(updateUserSchema),
  userController.updateProfile
)

export { router as userRoutes }
