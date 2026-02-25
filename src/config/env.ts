import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 8000,
  WHITELIST_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL
  ],
  DATABASE_URL: process.env.DATABASE_URL
}
