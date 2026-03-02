/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { variantRepository } from '@/modules/product/variant/variant.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { T_UpdateVariantInput } from '@/modules/product/variant/variant.schema'

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
  }
}
