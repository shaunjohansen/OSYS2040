const http = require('http')
const fs = require('fs')
const path = require('path')
const port = Number(process.env.PORT) || 8000

const STATIC_FILES = path.join(__dirname, 'static')

const requestHandler = (request, response) => {
  console.log(request.method, request.url)

  try {
    let requestedFile = path.join(STATIC_FILES, request.url)

    if (!fs.existsSync(requestedFile) || fs.statSync(requestedFile).isDirectory()) {
      requestedFile = path.join(requestedFile, 'index.html')
    }

    if (!fs.existsSync(requestedFile)) {
      response.statusCode = 404
      response.end()
      return
    }

    const readStream = fs.createReadStream(requestedFile)
    readStream.pipe(response)

  } catch (exception) {
    console.log('exception', exception)
    response.statusCode = 500
    response.end('' + exception)
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.error('error starting server:', error)
  }

  console.log(`server is listening on ${port}`)
})
