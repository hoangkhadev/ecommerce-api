/**Node modules */
import http from 'http'

/**Custom modules */
import app from '@/app'

const PORT = 8000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running on port: ' + PORT)
})
