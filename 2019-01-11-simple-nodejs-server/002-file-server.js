const http = require('http')
const fs = require('fs')
const path = require('path')
const port = Number(process.env.PORT) || 8000

const requestHandler = (request, response) => {
  console.log(request.method, request.url)
  const readStream = fs.createReadStream(path.join(__dirname, 'static/index.html'))

  response.setHeader('Content-Type', 'text/plain')

  readStream.pipe(response)
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.error('error starting server:', error)
  }

  console.log(`server is listening on ${port}`)
})
