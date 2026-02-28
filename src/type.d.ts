declare namespace Express {
  interface Request {
    refreshToken?: string
    user?: {
      sub: number
      role: string
    }
  }
}
