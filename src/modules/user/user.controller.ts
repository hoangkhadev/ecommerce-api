/**Custom modules */
import { success } from '@/utils/response'

/**Services */
import { userService } from '@/modules/user/user.service'

/**Types */
import type { NextFunction, Request, Response } from 'express'

export const userController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const me = await userService.getProfile(req.user!.sub)
      return success(res, {
        message: 'Get profile success',
        data: { user: me }
      })
    } catch (error) {
      console.error('Error get profile: ', error)
      next(error)
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userUpdated = await userService.updateProfile(
        req.user!.sub,
        req.body
      )
      return success(res, {
        message: 'Update current user success',
        data: userUpdated
      })
    } catch (error) {
      console.error('Error update profile: ', error)
      next(error)
    }
  }
}
