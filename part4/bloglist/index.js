const http = require('http')
require('dotenv').config()
const app = require('./app')




const server = http.createServer(app)
const PORT = 3003
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})