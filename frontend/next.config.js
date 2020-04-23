/* eslint-disable no-undef */
console.log("config loaded")
// const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')
dotenv.config()

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8')
)


module.exports = withCSS(withLess({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL || 'http://localhost:3232',
    cdnUrl: process.env.CDN_URL || 'http://localhost:3232',
    sentryRelease: process.env.SENTRY_RELEASE || 'undefined',
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
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
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
}))
