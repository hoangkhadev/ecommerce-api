/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { variantRepository } from '@/modules/product/variant/variant.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

export const variantService = {
  getDetail: async (id: number) => {
    const variant = await variantRepository.findById(id)
    if (!variant) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }

    return variant
  }
}
