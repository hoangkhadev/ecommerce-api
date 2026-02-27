/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const requireRefreshToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return next(new AppError('Missing refresh token', StatusCodes.UNAUTHORIZED))
  }

  req.refreshToken = refreshToken
  next()
}
