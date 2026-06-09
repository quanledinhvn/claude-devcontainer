import express, { json } from 'express'

const app = express()

app.use(json())

app.get('/', (req, res) => {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress

  res.json({
    ip,
    method: req.method,
    url: req.originalUrl,
    protocol: req.protocol,
    host: req.hostname,
    userAgent: req.headers['user-agent'] || null,
    contentType: req.headers['content-type'] || null,
    acceptLanguage: req.headers['accept-language'] || null,
    headers: req.headers,
    query: req.query,
    timestamp: new Date().toISOString(),
  })
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000')
})