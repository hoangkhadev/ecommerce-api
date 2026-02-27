/**Node modules */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**Custom modules */
import { env } from '@/config/env'

/**Services */
import { authService } from '@/modules/auth/auth.service'

/**Repositories */
import { authRepository } from '@/modules/auth/auth.repository'

jest.mock('@/modules/auth/auth.repository', () => ({
  authRepository: {
    findByEmail: jest.fn(),
    findByPhone: jest.fn(),
    create: jest.fn(),
    createRefreshToken: jest.fn()
  }
}))
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

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
      ;(jwt.sign as jest.Mock)
        .mockReturnValueOnce('accessToken')
        .mockReturnValueOnce('refreshToken')
      ;(authRepository.createRefreshToken as jest.Mock).mockResolvedValue({})

      const result = await authService.login('test@gmail.com', '12345678')

      expect(authRepository.findByEmail).toHaveBeenCalledWith('test@gmail.com')
      expect(bcrypt.compare).toHaveBeenCalledWith('12345678', 'hashedPassword')

      expect(jwt.sign).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ sub: 1, role: 'USER' }),
        env.JWT_ACCESS_SECRET,
        expect.objectContaining({ expiresIn: expect.any(Number) })
      )

      expect(jwt.sign).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ sub: 1, role: 'USER' }),
        env.JWT_REFRESH_SECRET,
        expect.objectContaining({ expiresIn: expect.any(Number) })
      )
      expect(authRepository.createRefreshToken).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(String),
        expect.any(Date)
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
})
