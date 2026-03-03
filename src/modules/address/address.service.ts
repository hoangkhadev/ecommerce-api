/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { addressRepository } from '@/modules/address/address.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type {
  T_CreateAddressInput,
  T_UpdateAddressInput
} from '@/modules/address/address.schema'

export const addressService = {
  createAddress: async (userId: number, input: T_CreateAddressInput) => {
    const count = await addressRepository.countAdressByUserId(userId)
    return addressRepository.create({
      userId,
      ...input,
      isDefault: count === 0 ? true : (input.isDefault ?? false)
    })
  },
  getMyAddresses: async (userId: number) => {
    return addressRepository.findByUserId(userId)
  },
  getDetail: async (id: number, userId: number) => {
    const address = await addressRepository.findById(id, userId)
    if (!address) {
      throw new AppError('Address not found', StatusCodes.NOT_FOUND)
    }

    return address
  },
  updateAddress: async (
    userId: number,
    id: number,
    input: T_UpdateAddressInput
  ) => {
    const address = await addressRepository.findById(id, userId)
    if (!address) {
      throw new AppError('Address not found', StatusCodes.NOT_FOUND)
    }

    if (input.isDefault === true) {
      await addressRepository.updateIsDefaultToFalseByUserId(userId)
    }

    return addressRepository.update(id, input)
  }
}
