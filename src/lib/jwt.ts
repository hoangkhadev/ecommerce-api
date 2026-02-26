/**Node modules */
import jwt from 'jsonwebtoken'

/**Custom modules */
import { env } from '@/config/env'

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
