/* eslint-disable @typescript-eslint/no-explicit-any */
/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Repositories */
import { categoryRepository } from '@/modules/category/category.repository'
import { productRepository } from '@/modules/product/product.repository'

/**Types */
import type { T_CreateProductInput } from '@/modules/product/product.schema'

export const productService = {
  createProduct: async (input: T_CreateProductInput) => {
    const category = await categoryRepository.findById(input.categoryId)
    if (!category) {
      throw new AppError('Category not found', StatusCodes.NOT_FOUND)
    }
    const skus = input.variants.map((v: any) => v.sku)
    const existedSku = await productRepository.findSkuExits(skus)
    if (existedSku.length > 0) {
      throw new AppError(
        `Sku already exists: ${existedSku.map((s) => s.sku).join(', ')}`
      )
    }
    return productRepository.create(input)
  },
  getAllProduct: async (query: any) => {
    const page = query.page
    const limit = query.limit

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      productRepository.findMany({
        ...query,
        skip,
        take: limit
      }),
      productRepository.count(query)
    ])
    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit)
      }
    }
  }
}
