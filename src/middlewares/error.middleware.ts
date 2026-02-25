/**Custom modules */
import { AppError } from '@/errors/AppError'
import { env } from '@/config/env'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500
  let message = 'Internal Server Error'

  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack
    })
  }

  return res.status(statusCode).json({
    success: false,
    message
  })
}
