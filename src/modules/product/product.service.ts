/* eslint-disable @typescript-eslint/no-explicit-any */
/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Repositories */
import { categoryRepository } from '@/modules/category/category.repository'
import { productRepository } from '@/modules/product/product.repository'

/**Types */
import type {
  T_CreateProductInput,
  T_UpdateProductInput
} from '@/modules/product/product.schema'

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
        `Sku already exists: ${existedSku.map((s) => s.sku).join(', ')}`,
        StatusCodes.BAD_REQUEST
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
  },
  getDetailProduct: async (id: number) => {
    const product = await productRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND)
    }
    return product
  },
  updateProduct: async (id: number, data: T_UpdateProductInput) => {
    const product = await productRepository.findByIdUpdate(id)
    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND)
    }

    if (data.categoryId) {
      const category = await categoryRepository.findById(data.categoryId)
      if (!category) {
        throw new AppError('Category not found', StatusCodes.NOT_FOUND)
      }
    }

    return productRepository.update(id, data)
  },
  deleteProduct: async (id: number) => {
    const product = await productRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND)
    }
    await productRepository.softDelete(id)
  }
}
