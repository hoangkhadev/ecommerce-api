/**Node modules */
import { Router } from 'express'

/**Routes */
import { authRoutes } from '@/modules/auth/auth.route'
import { userRoutes } from '@/modules/user/user.route'
import { categoryRoutes } from '@/modules/category/category.route'
import { productRoutes } from '@/modules/product/product.route'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)

export { router as v1Routes }
