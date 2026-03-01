/**Custom modules */
import { prisma } from '@/lib/prisma'
import { T_CreateCategoryInput } from '@/modules/category/category.schema'

export const categoryRepository = {
  findById: async (id: number) => {
    return prisma.category.findFirst({ where: { id, deletedAt: null } })
  },
  findBySlug: async (slug: string) => {
    return prisma.category.findUnique({ where: { slug } })
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
  }
}
