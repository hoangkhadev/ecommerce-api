/**Node modules */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '@/lib/jwt'
import { hashToken } from '@/utils/hash'

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

    const refreshTokenHash = hashToken(refreshToken)

    await authRepository.createRefreshToken(user.id, refreshTokenHash)

    return { accessToken, refreshToken }
  },
  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const payload = verifyRefreshToken(refreshToken) as T_JwtPayload

    const refreshTokenHash = hashToken(refreshToken)

    const savedToken = await authRepository.findRefreshToken(refreshTokenHash)
    if (!savedToken) {
      throw new AppError('Invalid refresh token', StatusCodes.UNAUTHORIZED)
    }

    const accessToken = generateAccessToken({
      sub: payload.sub,
      role: payload.role
    })
    const newRefreshToken = generateRefreshToken({
      sub: payload.sub,
      role: payload.role
    })

    const newRefreshTokenHash = hashToken(newRefreshToken)
    await authRepository.replaceRefreshToken(savedToken.id, newRefreshTokenHash)

    return { accessToken, refreshToken: newRefreshToken }
  }
}
