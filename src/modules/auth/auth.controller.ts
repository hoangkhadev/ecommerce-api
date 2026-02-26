/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { authService } from '@/modules/auth/auth.service'

/**Types */
import type { NextFunction, Request, Response } from 'express'

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body)
      return success(res, { statusCode: StatusCodes.CREATED, data: user })
    } catch (error) {
      console.error('Error register: ', error)
      next(error)
    }
  }
}
