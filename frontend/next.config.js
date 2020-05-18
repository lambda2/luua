/* eslint-disable no-undef */
console.log('config loaded')
// const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')

dotenv.config()

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8')
)

module.exports = withBundleAnalyzer(withCSS(withLess({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3232',
    apiUrl: process.env.API_URL || 'http://localhost:3232',
    cdnUrl: process.env.CDN_URL || 'http://localhost:3232',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    sentryRelease: process.env.SENTRY_RELEASE || '',
    sentryDsn: process.env.SENTRY_DSN || '',
    releaseTag: process.env.RELEASE || '',
    contact: {
      email: process.env.CONTACT_EMAIL || 'hello@luua.io',
      twitter: process.env.CONTACT_TWITTER || 'lambda_2',
      space: process.env.CONTACT_SPACE || 'https://alpha.luua.io/luua',
    },
    staticFolder: '/static',
  },
  // sassLoaderOptions: {
  //   includePaths: ["stylesheets"]
  // },
  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: "[local]___[hash:base64:5]",
  // },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
    localIdentName: '[local]___[hash:base64:5]',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // @TODO all this mess is just for antd
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
  poweredByHeader: false,
})))
