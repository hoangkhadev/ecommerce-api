/**Node modules */
import http from 'http'

/**Custom modules */
import app from '@/app'
import { env } from '@/config/env'

const server = http.createServer(app)

server.listen(env.PORT, () => {
  console.log('Server running on port: ' + env.PORT)
})
