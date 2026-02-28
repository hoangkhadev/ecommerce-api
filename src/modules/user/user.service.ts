/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Repositories */
import { userRepository } from '@/modules/user/user.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

export const userService = {
  getProfile: async (userIđ: number) => {
    const user = await userRepository.findById(userIđ)
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user
    return safeUser
  }
}
