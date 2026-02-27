/**Node modules */
import { Router } from 'express'

/**Controllers */
import { authController } from '@/modules/auth/auth.controller'

/**Middlewares */
import { validate } from '@/middlewares/validate.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'
import { requireRefreshToken } from '@/middlewares/require-refresh-token.middleware'

/**Schemas */
import { registerSchema, loginSchema } from '@/modules/auth/auth.schema'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh-token', requireRefreshToken, authController.refreshToken)
router.post('/logout', authenticate, requireRefreshToken, authController.logout)

export { router as authRoutes }
