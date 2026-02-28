/**Node modules */
import { Router } from 'express'

/**Controllers */
import { userController } from '@/modules/user/user.controller'

/**Middlewares */
import { authenticate } from '@/middlewares/authenticate.middleware'

const router = Router()

router.get('/me', authenticate, userController.getProfile)

export { router as userRoutes }
