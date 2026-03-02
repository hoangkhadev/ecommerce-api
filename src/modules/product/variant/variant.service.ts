/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { variantRepository } from '@/modules/product/variant/variant.repository'
import { productRepository } from '@/modules/product/product.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type {
  T_CreateVariantInput,
  T_UpdateVariantInput
} from '@/modules/product/variant/variant.schema'

export const variantService = {
  getDetail: async (id: number) => {
    const variant = await variantRepository.findById(id)
    if (!variant) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }

    return variant
  },
  updateVariant: async (id: number, data: T_UpdateVariantInput) => {
    const variant = await variantRepository.findById(id)
    if (!variant) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }
    return variantRepository.update(id, data)
  },
  deleteVariant: async (id: number) => {
    const variant = await variantRepository.findById(id)
    if (!variant) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }
    await variantRepository.softDelete(id)
  },
  createVariant: async (productId: number, data: T_CreateVariantInput) => {
    const product = await productRepository.findById(productId)
    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND)
    }

    const existedSku = await variantRepository.findSku(data.sku)
    if (existedSku) {
      throw new AppError('SKU already exists', StatusCodes.BAD_REQUEST)
    }

    return variantRepository.create(productId, data)
  }
}
