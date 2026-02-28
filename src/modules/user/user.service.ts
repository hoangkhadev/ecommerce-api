/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { userRepository } from '@/modules/user/user.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { T_UpdateUserInput } from '@/modules/user/user.schema'

export const userService = {
  getProfile: async (userIđ: number) => {
    const user = await userRepository.findById(userIđ)
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user
    return safeUser
  },
  updateProfile: async (userId: number, data: T_UpdateUserInput) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND)
    }
    if (data.email) {
      const existEmail = await userRepository.findByEmail(data.email)
      if (existEmail && existEmail.id !== userId) {
        throw new AppError('Email already exists')
      }
    }
    if (data.phone) {
      const existPhone = await userRepository.findByPhone(data.phone)
      if (existPhone && existPhone.id !== userId) {
        throw new AppError('Phone already exists')
      }
    }
    const updatedUser = await userRepository.updateById(userId, data)
    return updatedUser
  }
}
