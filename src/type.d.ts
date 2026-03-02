/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  interface Request {
    refreshToken?: string
    user?: {
      sub: number
      role: string
    }
    validatedQuery?: any
  }
}
