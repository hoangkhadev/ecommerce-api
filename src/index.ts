/**Node modules */
import http from 'http'

/**Custom modules */
import app from '@/app'
import { env } from '@/config/env'
import { prisma } from '@/lib/prisma'

const server = http.createServer(app)

async function startServer() {
  try {
    await prisma.$connect()
    console.log(`Database connected`)
    server.listen(env.PORT, () => {
      console.log('Server running on port: ' + env.PORT)
    })
  } catch (error) {
    console.error('Failed to connect database: ', error)
    process.exit(1)
  }
}

startServer()
