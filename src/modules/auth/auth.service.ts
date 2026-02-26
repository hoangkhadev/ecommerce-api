/**Node modules */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

/**Api Error */
import { AppError } from '@/errors/AppError'

/**Repositories */
import { authRepository } from '@/modules/auth/auth.repository'

/**Types */
import type { T_RegisterInput } from '@/modules/auth/auth.schema'

export const authService = {
  register: async (input: T_RegisterInput) => {
    const emailExists = await authRepository.findByEmail(input.email)

    if (emailExists) {
      throw new AppError('Email already exists', StatusCodes.CONFLICT)
    }

    const phoneExists = await authRepository.findByPhone(input.phone)
    if (phoneExists) {
      throw new AppError('Phone already exists', StatusCodes.CONFLICT)
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(input.password, salt)

    const data = {
      ...input,
      password: passwordHash
    }

    const user = await authRepository.create(data)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user

    return safeUser
  }
}
