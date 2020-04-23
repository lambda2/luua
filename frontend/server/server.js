const express = require('express')
const next = require('next')
const { join } = require('path')

// const nextI18NextMiddleware = require('next-i18next/middleware').default

// const nextI18next = require('../i18n/i18n')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

const getLocale = (req) => {
  // @TODO read subdomains to read locale
  return 'fr'
}

(async () => {
  await app.prepare()
  const server = express()

  // await nextI18next.initPromise

  // server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res) => {
    const locale = getLocale(req)
    req.locale = locale
    handle(req, res)
  })

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("|  LUUA IS READY ! |")
  console.log("~~~~~~~~~~~~~~~~~~~~")

})()
