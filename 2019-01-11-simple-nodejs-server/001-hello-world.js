const http = require('http')
const port = Number(process.env.PORT) || 8000

const requestHandler = (request, response) => {
  console.log(request.method, request.url)
  console.log('Request Headers:', request.headers)

  // response.end('Greetings from your friendly neighourhood nodejs server!')
  response.setHeader('Content-Type', 'this is a header - even though the browser does not understand it')
  response.end(JSON.stringify(request.headers, null, 2))
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.error('error starting server:', error)
  }

  console.log(`server is listening on ${port}`)
})
