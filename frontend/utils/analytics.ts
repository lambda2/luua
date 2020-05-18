import Cookie from 'js-cookie'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const API_URL = publicRuntimeConfig.apiUrl

const isServer = (typeof window === 'undefined')
let ahoy: any = null

if (!isServer) {
  ahoy = require('ahoy.js').default
  ahoy.configure({
    urlPrefix: '',
    visitsUrl: `${API_URL}/ahoy/visits`,
    eventsUrl: `${API_URL}/ahoy/events`,
    page: null,
    platform: 'Web',
    useBeacon: true,
    startOnReady: true,
    trackVisits: true,
    cookies: false,
    cookieDomain: null,
    headers: { 'Authorization': `${Cookie.get('token')}` },
    visitParams: {},
    withCredentials: false
  })
}

export default ahoy
