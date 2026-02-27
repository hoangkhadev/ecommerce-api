declare namespace Express {
  interface Request {
    refreshToken?: string
    user?: {
      sub: string | number
      role: string
    }
  }
}
