/**Node modules */
import { StatusCodes } from 'http-status-codes'

/**Custom modules */
import { success } from '@/utils/response'
import { env } from '@/config/env'

/**Services */
import { authService } from '@/modules/auth/auth.service'

/**Types */
import type { NextFunction, Request, Response } from 'express'
import type { T_LoginInput } from '@/modules/auth/auth.schema'

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body)
      return success(res, { statusCode: StatusCodes.CREATED, data: user })
    } catch (error) {
      console.error('Error register: ', error)
      next(error)
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as T_LoginInput
      const { accessToken, refreshToken } = await authService.login(
        email,
        password
      )
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'producttion',
        sameSite: 'strict'
      })

      return success(res, {
        message: 'Login successfully',
        data: { accessToken }
      })
    } catch (error) {
      console.error('Error login: ', error)
      next(error)
    }
  },
  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokens = await authService.refreshToken(req.refreshToken!)

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict'
      })

      return success(res, {
        message: 'Refresh token success',
        data: { accessToken: tokens.accessToken }
      })
    } catch (error) {
      console.error('Error refresh token: ', error)
      next(error)
    }
  }
}
