import App, { AppProps } from 'next/app'
import Layout from 'layouts/Layout/Layout'
import * as Sentry from '@sentry/node';
import getConfig from 'next/config';

import { config } from '@fortawesome/fontawesome-svg-core'
const { publicRuntimeConfig } = getConfig();

// Stylesheets
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import 'antd/dist/antd.less'
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import "react-mde/lib/styles/css/react-mde-all.css";


import '../styles/app.less'
import { propsFromContext } from 'utils/auth';

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const sentryConfig = {
  enabled: process.env.NODE_ENV === 'production',
  dsn: publicRuntimeConfig.sentryDsn,
  release: publicRuntimeConfig.sentryRelease
}

Sentry.init(sentryConfig);

console.log("[SENTRY] Initializating with: ", sentryConfig);


const LuuaApp = ({ Component, pageProps, err }: any) => {
  return (<Layout locale={pageProps.locale} token={pageProps.token}>
    {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
    <Component {...pageProps} err={err} />
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
