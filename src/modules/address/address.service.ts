/**Repositories */
import { addressRepository } from '@/modules/address/address.repository'

/**Types */
import type { T_CreateAddressInput } from '@/modules/address/address.schema'

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
  }
}
