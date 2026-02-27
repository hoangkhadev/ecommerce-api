import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 8000,
  WHITELIST_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL
  ],
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRED: Number(process.env.JWT_ACCESS_EXPIRED),
  JWT_REFRESH_EXPIRED: Number(process.env.JWT_REFRESH_EXPIRED)
}
