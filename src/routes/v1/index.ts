/**Node modules */
import { Router } from 'express'

/**Routes */
import { authRoutes } from '@/modules/auth/auth.route'
import { userRoutes } from '@/modules/user/user.route'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export { router as v1Routes }
