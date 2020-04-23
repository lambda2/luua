const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const getLocale = (req) => {
  // @TODO read subdomains to read locale
  return 'fr'
}

/**
 * Spin our express server with nextJS middleware
 */
(async () => {
  await app.prepare()
  const server = express()

  server.get('*', (req, res) => {
    const locale = getLocale(req)
    req.locale = locale
    handle(req, res)
  })

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
  console.log('~~~~~~~~~~~~~~~~~~~~')
  console.log('|  LUUA IS READY 💃 |')
  console.log('~~~~~~~~~~~~~~~~~~~~')
})()
