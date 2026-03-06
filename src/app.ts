/**Node modules */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/**Custom modules */
import { env } from '@/config/env'

/**Middlewares */
import { errorMiddleware } from '@/middlewares/error.middleware'

/**App routes */
import { v1Routes } from '@/routes/v1'

/**Types */
import type { CorsOptions } from 'cors'

const app = express()

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin) return callback(null, true)
    if (env.WHITELIST_ORIGINS.includes(requestOrigin))
      return callback(null, true)

    return callback(new Error('Not allowed by CORS'), false)
  }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({
    name: 'E-commerce API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api/v1'
    }
  })
})
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

/**Api routes */
app.use('/api/v1', v1Routes)

/**Error handler */
app.use(errorMiddleware)

export default app
