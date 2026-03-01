/**Node modules */
import { StatusCodes } from 'http-status-codes'
import slugify from 'slugify'

/**Repositories */
import { categoryRepository } from '@/modules/category/category.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

export const categoryService = {
  createCategory: async (name: string, parentId?: number) => {
    if (parentId) {
      const parent = await categoryRepository.findById(parentId)
      if (!parent) {
        throw new AppError('Parent category not found', StatusCodes.NOT_FOUND)
      }
    }

    const baseSlug = slugify(name)
    let slug = baseSlug
    let count = 1

    while (await categoryRepository.findBySlug(slug)) {
      slug = `${baseSlug}-${count++}`
    }

    return categoryRepository.create({ name, slug, parentId })
  }
}
