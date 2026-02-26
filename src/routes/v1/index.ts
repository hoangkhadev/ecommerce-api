/**Node modules */
import { Router } from 'express'

/**Routes */
import { authRoutes } from '@/modules/auth/auth.route'

const router = Router()

router.use('/auth', authRoutes)

export { router as v1Routes }
