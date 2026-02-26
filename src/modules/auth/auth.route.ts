/**Node modules */
import { Router } from 'express'

/**Controllers */
import { authController } from '@/modules/auth/auth.controller'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'

/**Schemas */
import { registerSchema } from '@/modules/auth/auth.schema'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)

export { router as authRoutes }
