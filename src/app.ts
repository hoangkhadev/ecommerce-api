/**Node modules */
import express from 'express'

const app = express()

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

export default app
