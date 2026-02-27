/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { verifyAcessToken } from '@/lib/jwt'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { Request, Response, NextFunction } from 'express'
import type { T_JwtPayload } from '@/modules/auth/auth.types'

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Missing access token', StatusCodes.UNAUTHORIZED)
  }
  const token = authHeader.split(' ')[1]
  const payload = verifyAcessToken(token) as T_JwtPayload
  req.user = payload
  next()
}
