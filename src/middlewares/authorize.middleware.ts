/**Node modules */
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const authorize =
  (roles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(
        getReasonPhrase(StatusCodes.UNAUTHORIZED),
        StatusCodes.UNAUTHORIZED
      )
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      )
    }

    next()
  }
