/**Node modules */
import { Router } from 'express'

/**Routes */
import { authRoutes } from '@/modules/auth/auth.route'
import { userRoutes } from '@/modules/user/user.route'
import { categoryRoutes } from '@/modules/category/category.route'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)

export { router as v1Routes }
