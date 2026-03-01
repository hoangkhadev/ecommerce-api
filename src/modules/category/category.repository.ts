/**Custom modules */
import { prisma } from '@/lib/prisma'

/**Types */
import type { Category } from 'generated/prisma/client'
import type { T_CreateCategoryInput } from '@/modules/category/category.schema'

export const categoryRepository = {
  findById: async (id: number) => {
    return prisma.category.findFirst({ where: { id, deletedAt: null } })
  },
  findBySlug: async (slug: string) => {
    return prisma.category.findUnique({
      where: { slug, deletedAt: null },
      include: {
        parent: true,
        children: { where: { deletedAt: null } }
      }
    })
  },
  create: async (data: T_CreateCategoryInput & { slug: string }) => {
    return prisma.category.create({ data })
  },
  findAll: async () => {
    return prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: {
        createdAt: 'asc'
      }
    })
  },
  update: async (
    id: number,
    data: Pick<Category, 'name' | 'parentId'> & { slug?: string }
  ) => {
    return prisma.category.update({
      where: { id },
      data,
      include: { parent: true, children: { where: { deletedAt: null } } }
    })
  }
}
