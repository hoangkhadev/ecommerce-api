/**Node modules */
import bcrypt from 'bcryptjs'

/**Custom modules */
import { hashToken } from '@/utils/hash'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '@/lib/jwt'

/**Services */
import { authService } from '@/modules/auth/auth.service'

/**Repositories */
import { authRepository } from '@/modules/auth/auth.repository'

jest.mock('@/modules/auth/auth.repository', () => ({
  authRepository: {
    findByEmail: jest.fn(),
    findByPhone: jest.fn(),
    create: jest.fn(),
    createRefreshToken: jest.fn(),
    findRefreshToken: jest.fn(),
    replaceRefreshToken: jest.fn()
  }
}))
jest.mock('bcryptjs')
jest.mock('@/utils/hash')
jest.mock('@/lib/jwt')

describe('AuthService', () => {
  describe('Register', () => {
    it('Should register successfully', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue(null)
      ;(authRepository.findByPhone as jest.Mock).mockResolvedValue(null)
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
      ;(authRepository.create as jest.Mock).mockResolvedValue({
        id: 1,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@gmail.com',
        phone: '0123456789',
        password: 'hashedPassword',
        role: 'USER'
      })

      const result = await authService.register({
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@gmail.com',
        phone: '0123456789',
        password: '12345678'
      })

      expect(authRepository.findByEmail).toHaveBeenCalledWith('test@gmail.com')
      expect(authRepository.findByPhone).toHaveBeenCalledWith('0123456789')
      expect(bcrypt.hash).toHaveBeenCalled()
      expect(authRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ password: 'hashedPassword' })
      )
      expect(result.firstName).toBe('firstName')
      expect(result.lastName).toBe('lastName')
      expect(result.email).toBe('test@gmail.com')
      expect(result.phone).toBe('0123456789')
      expect(result.role).toBe('USER')
    })

    it('Should throw if email exists', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@gmail.com'
      })

      await expect(
        authService.register({
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'test@gmail.com',
          phone: '0123456789',
          password: '12345678'
        })
      ).rejects.toThrow(
        expect.objectContaining({ message: 'Email already exists' })
      )
    })

    it('Should throw if phone exists', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue(null)
      ;(authRepository.findByPhone as jest.Mock).mockResolvedValue({
        id: 1,
        phone: '0123456789'
      })

      await expect(
        authService.register({
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'test@gmail.com',
          phone: '0123456789',
          password: '123456'
        })
      ).rejects.toThrow(
        expect.objectContaining({ message: 'Phone already exists' })
      )
    })
  })

  describe('Login', () => {
    it('Should login successfully', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@gmail.com',
        password: 'hashedPassword',
        role: 'USER'
      })
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(generateAccessToken as jest.Mock).mockReturnValue('accessToken')
      ;(generateRefreshToken as jest.Mock).mockReturnValue('refreshToken')
      ;(hashToken as jest.Mock).mockReturnValue('refreshTokenHashed')
      ;(authRepository.createRefreshToken as jest.Mock).mockResolvedValue({
        id: 1,
        token: 'refreshTokenHashed'
      })

      const result = await authService.login('test@gmail.com', '12345678')

      expect(authRepository.findByEmail).toHaveBeenCalledWith('test@gmail.com')
      expect(bcrypt.compare).toHaveBeenCalledWith('12345678', 'hashedPassword')

      expect(generateAccessToken).toHaveBeenCalledWith({ sub: 1, role: 'USER' })
      expect(generateRefreshToken).toHaveBeenCalledWith({
        sub: 1,
        role: 'USER'
      })
      expect(hashToken).toHaveBeenCalledWith('refreshToken')
      expect(authRepository.createRefreshToken).toHaveBeenCalledWith(
        1,
        'refreshTokenHashed'
      )

      expect(result.accessToken).toBe('accessToken')
      expect(result.refreshToken).toBe('refreshToken')
    })

    it('Should throw if user not found', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue(null)

      await expect(
        authService.login('test@gmail.com', '12345678')
      ).rejects.toThrow(
        expect.objectContaining({ message: 'Invalid Credentials' })
      )
    })

    it('Should throw if password incorrect', async () => {
      ;(authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@gmail.com',
        password: 'hashedPassword'
      })
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      await expect(
        authService.login('test@gmail.com', '12345678')
      ).rejects.toThrow(
        expect.objectContaining({
          message: 'Invalid Credentials'
        })
      )
    })
  })

  describe('Refresh token', () => {
    it('Should return new tokens', async () => {
      ;(verifyRefreshToken as jest.Mock).mockReturnValue({ sub: 1 })
      ;(authRepository.findRefreshToken as jest.Mock).mockReturnValue({ id: 1 })
      ;(generateAccessToken as jest.Mock).mockReturnValue('newAccessToken')
      ;(generateRefreshToken as jest.Mock).mockReturnValue('newRefreshToken')
      ;(hashToken as jest.Mock).mockReturnValue('newRefreshTokenHashed')

      const result = await authService.refreshToken('refreshToken')

      expect(authRepository.replaceRefreshToken).toHaveBeenCalledWith(
        1,
        'newRefreshTokenHashed'
      )
      expect(result).toEqual({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken'
      })
    })

    it('Should throw if refresh token not found', async () => {
      ;(verifyRefreshToken as jest.Mock).mockReturnValue({
        sub: 1
      })
      ;(authRepository.findRefreshToken as jest.Mock).mockResolvedValue(null)

      await expect(authService.refreshToken('token')).rejects.toThrow(
        expect.objectContaining({ message: 'Invalid refresh token' })
      )
    })

    it('Should throw if token invalid', async () => {
      ;(verifyRefreshToken as jest.Mock).mockImplementation(() => {
        throw new Error()
      })

      await expect(
        authService.refreshToken('invalidRefreshToken')
      ).rejects.toThrow()
    })
  })
})
