/**Node modules */
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

/**Types */
import type { Response } from 'express'

type T_SuccessOption<T> = {
  statusCode?: number
  message?: string
  data?: T
}

export const success = <T>(
  res: Response,
  { statusCode = StatusCodes.OK, message, data }: T_SuccessOption<T>
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message: message ?? getReasonPhrase(statusCode),
    data
  })
}
