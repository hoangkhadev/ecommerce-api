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
  JWT_REFRESH_EXPIRED: Number(process.env.JWT_REFRESH_EXPIRED),
  VNP_TMN_CODE: process.env.VNP_TMN_CODE,
  VNP_HASH_SECRET: process.env.VNP_HASH_SECRET,
  VNP_URL: process.env.VNP_URL,
  VNP_RETURN_URL: process.env.VNP_RETURN_URL
}
