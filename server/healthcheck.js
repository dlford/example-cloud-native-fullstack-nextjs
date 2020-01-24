const http = require('http')

const port = process.env.PORT || 3000

const query = '{ "query": "{ healthcheck }" }'

const options = {
  hostname: 'localhost',
  port,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

const req = http.request(options, (res) => {
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    const { data } = JSON.parse(chunk)
    if (data.healthcheck === true) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  })
})

req.on('error', () => {
  process.exit(1)
})

req.write(query)

req.end()
