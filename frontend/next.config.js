/* eslint-disable no-undef */
console.log('config loaded')
// const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
// const withSourceMaps = require('@zeit/next-source-maps')
// const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')

dotenv.config()

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8')
)

const {
  SENTRY_FRONTEND_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  BACKEND_URL,
  API_URL,
  CDN_URL,
  APP_URL,
  SENTRY_RELEASE,
  RELEASE,
  CONTACT_EMAIL,
  CONTACT_TWITTER,
  CONTACT_SPACE,
} = process.env



module.exports = withBundleAnalyzer(withCSS(withLess({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: BACKEND_URL || 'http://localhost:3232',
    apiUrl: API_URL || 'http://localhost:3232',
    cdnUrl: CDN_URL || 'http://localhost:3232',
    appUrl: APP_URL || 'http://localhost:3000',
    sentryRelease: SENTRY_RELEASE || '',
    sentryDsn: SENTRY_DSN || '',
    releaseTag: RELEASE || '',
    contact: {
      email: CONTACT_EMAIL || 'hello@luua.io',
      twitter: CONTACT_TWITTER || 'lambda_2',
      space: CONTACT_SPACE || 'https://alpha.luua.io/manage/luua',
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
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    if (isServer) {
      // @TODO all this mess is just for antd
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]

      // In `pages/_app.js`, Sentry is imported from @sentry/node. While
      // @sentry/browser will run in a Node.js environment, @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs#customizing-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle

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

    // if (
    //   SENTRY_DSN &&
    //   SENTRY_ORG &&
    //   SENTRY_PROJECT &&
    //   SENTRY_AUTH_TOKEN
    // ) {
    //   config.plugins.push(
    //     new SentryWebpackPlugin({
    //       include: '.next',
    //       ignore: ['node_modules'],
    //       urlPrefix: '~/_next',
    //       release: SENTRY_RELEASE || options.buildId,
    //     })
    //   )
    // }

    return config
  },
  poweredByHeader: false,
})))
