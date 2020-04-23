import App, { AppProps } from 'next/app'
import Layout from '../layouts/Layout/Layout'
import * as Sentry from '@sentry/browser';

import { config } from '@fortawesome/fontawesome-svg-core'

// Stylesheets
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import 'antd/dist/antd.less'
import '../styles/app.less'
import { propsFromContext } from '../utils/auth';

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


// @TODO add sentry
// Sentry.init({
//   dsn: "https://xxx@sentry.io/2012324",
//   release: publicRuntimeConfig.sentryRelease
// });


const LuuaApp = ({ Component, pageProps }: AppProps) => {
  return (<Layout locale={pageProps.locale} token={pageProps.token}>
    <Component {...pageProps} />
  </Layout>)
}

LuuaApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);  
  const contextProps = propsFromContext(appContext.ctx)
  const pageProps = { pageProps: { ...appProps.pageProps, ...contextProps } }
  return { ...appProps, ...pageProps }
}


export default LuuaApp
