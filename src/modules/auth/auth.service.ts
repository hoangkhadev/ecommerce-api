/**Node modules */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { env } from '@/config/env'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

/**Api Error */
import { AppError } from '@/errors/AppError'

/**Repositories */
import { authRepository } from '@/modules/auth/auth.repository'

/**Types */
import type { T_RegisterInput } from '@/modules/auth/auth.schema'
import type { T_JwtPayload } from '@/modules/auth/auth.types'

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
  },
  login: async (
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const user = await authRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new AppError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const payload: T_JwtPayload = {
      sub: user.id,
      role: user.role
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    const salt = await bcrypt.genSalt(10)
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt)

    await authRepository.createRefreshToken(
      user.id,
      refreshTokenHash,
      new Date(Date.now() + env.JWT_REFRESH_EXPIRED * 1000)
    )

    return { accessToken, refreshToken }
  }
}
