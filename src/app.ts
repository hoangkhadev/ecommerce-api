/**Node modules */
import express from 'express'
import cors from 'cors'

/**Custom modules */
import { env } from '@/config/env'

/**Middlewares */
import { errorMiddleware } from '@/middlewares/error.middleware'

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

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})
app.get('/api', (_req, res) => {
  res.json({
    name: 'Moda Ecommerce API',
    version: '1.0.0'
  })
})

/**Error handler */
app.use(errorMiddleware)

export default app
