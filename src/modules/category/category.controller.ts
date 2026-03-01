/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { categoryService } from '@/modules/category/category.service'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { Request, Response, NextFunction } from 'express'
import type { T_CreateCategoryInput } from '@/modules/category/category.schema'

export const categoryController = {
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, parentId } = req.body as T_CreateCategoryInput
      const category = await categoryService.createCategory(name, parentId)
      return success(res, {
        message: 'Create category success',
        statusCode: StatusCodes.CREATED,
        data: category
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error create category: ', error)
      if (error.code === 'P2002') {
        throw new AppError('Category already exists', StatusCodes.CONFLICT)
      }
      next(error)
    }
  },
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.findAll()
      return success(res, {
        message: 'Get all categories success',
        data: categories
      })
    } catch (error) {
      console.error('Error get all categories: ', error)
      next(error)
    }
  },
  getBySlug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params as { slug: string }
      const data = await categoryService.getBySlug(slug)
      return success(res, { message: 'Get category success', data })
    } catch (error) {
      console.error('Error get category by slug: ', error)
      next(error)
    }
  },
  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const data = await categoryService.updateCategory(id, req.body)
      return success(res, { message: 'Update category success', data })
    } catch (error) {
      console.error('Error update category: ', error)
      next(error)
    }
  }
}
