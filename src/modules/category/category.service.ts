/**Node modules */
import { StatusCodes } from 'http-status-codes'
import slugify from 'slugify'

/**Repositories */
import { categoryRepository } from '@/modules/category/category.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { Category } from 'generated/prisma/client'

type CategoryNode = Category & {
  children: CategoryNode[]
}

function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>()
  const roots: CategoryNode[] = []
  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] })
  })

  categories.forEach((cat) => {
    const node = map.get(cat.id)!
    if (cat.parentId) {
      map.get(cat.parentId)?.children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}

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
  },
  findAll: async () => {
    const categories = await categoryRepository.findAll()
    return buildCategoryTree(categories)
  },
  getBySlug: async (slug: string) => {
    const category = await categoryRepository.findBySlug(slug)
    if (!category) {
      throw new AppError('Category not found', StatusCodes.NOT_FOUND)
    }

    return category
  }
}
