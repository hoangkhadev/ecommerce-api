/**Node modules */
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { env } from '@/config/env'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { T_JwtPayload } from '@/modules/auth/auth.types'

export const generateAccessToken = (payload: T_JwtPayload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
    expiresIn: env.JWT_ACCESS_EXPIRED
  })
}

export const generateRefreshToken = (payload: T_JwtPayload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: env.JWT_REFRESH_EXPIRED
  })
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET!)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Refresh token expired', StatusCodes.UNAUTHORIZED)
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid refresh token', StatusCodes.UNAUTHORIZED)
    }
    throw error
  }
}
