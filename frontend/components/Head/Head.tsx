import NextHead from 'next/head';
import React from 'react';
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { useLocale } from 'hooks/useLocale';
const { publicRuntimeConfig } = getConfig()

interface Props {
  title?: any
  description?: string
  url?: string
  ogImage?: string
}

export const Head = ({
  title,
  description,
  url,
  ogImage
 }: Props) => {
  const router = useRouter()
  const ROOT_URL = publicRuntimeConfig.appUrl

  const { t } = useLocale()
  const defaultDescription = t('meta.head.description');
  const defaultOGURL = `${ROOT_URL}/${router.asPath}`;
  const defaultOGImage = '';

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title ? `${title} · 💃` : 'Luua'}</title>
      <meta
        name="description"
        content={description || defaultDescription}
      />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      {/* @TODO remove when we have an icon */}
      {/* <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" /> */}

      <link rel="prefetch" href={publicRuntimeConfig.apiUrl} />
      <meta property="og:url" content={url || defaultOGURL} />
      <meta property="og:title" content={title || ''} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
    </NextHead>
  )
}
export default Head