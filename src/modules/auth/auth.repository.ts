/**Node modules */
import { env } from '@/config/env'
import { prisma } from '@/lib/prisma'

/**Types */
import type { T_RegisterInput } from '@/modules/auth/auth.schema'

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findFirst({ where: { email } })
  },
  findByPhone: async (phone: string) => {
    return prisma.user.findFirst({ where: { phone } })
  },
  create: async (data: T_RegisterInput) => {
    return prisma.user.create({ data })
  },
  createRefreshToken: async (userId: number, token: string) => {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiredAt: new Date(Date.now() + env.JWT_REFRESH_EXPIRED * 1000)
      }
    })
  },
  findRefreshToken: async (refreshToken: string) => {
    return prisma.refreshToken.findUnique({ where: { token: refreshToken } })
  },
  replaceRefreshToken: async (id: number, token: string) => {
    return prisma.refreshToken.update({
      where: { id },
      data: {
        token,
        expiredAt: new Date(Date.now() + env.JWT_REFRESH_EXPIRED * 1000)
      }
    })
  },
  deleteRefreshToken: async (refreshToken: string) => {
    return prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
  }
}
