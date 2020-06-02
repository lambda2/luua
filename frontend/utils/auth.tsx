import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import api from './http'
import NetworkError from './errors/NetworkError'
import { NextPageContext } from 'next'

/**
 * Signup the user with the given credentials.
 * Redirect him to the profile page on success.
 * 
 * @param {string} username the user username
 * @param {string} email the user email
 * @param {string} password the user password
 * @param {string} password_confirmation the user password
 */
export const signupWithCredentials = async (
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  ) => {
  const user = { username, email, password, password_confirmation }
  const endpoint = '/users'
  const { data, status, headers } = await api(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { user },
  })
  if (status < 300) {
    cookie.set('token', headers.authorization, { expires: 1 })
    // login(headers.authorization, { status: 'welcome' })
    return data
  } else {
    // https://github.com/developit/unfetch#caveats
    throw new NetworkError(`${status}`, data)
  }
}

/**
 * Try to login the user with the given credentials.
 * Redirect him to the profile page on success.
 * 
 * @param {string} email the user email
 * @param {string} password the user password
 */
export const authenticateWithCredentials = async (
  email: string, password: string
  ) => {
  const user = { email, password }
  const endpoint = '/users/sign_in'
  const { data, status, headers } = await api(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { user },
  })  
  if (status < 300) {
    login(headers.authorization)
  } else {
    // https://github.com/developit/unfetch#caveats
    throw new NetworkError(`${status}`, data)
  }
}


/**
 * Log-in the user with the provided token,
 * and redirect him to the profile page
 * @param {string} token The JWT token
 * @export
 */
export const login = (token: string, opts = {}) => {
  cookie.set('token', token, { expires: 1 })
  Router.push({
    pathname: '/profile',
    query: opts,
  })
}


/**
 * Will try to get the token. If not, redirect to login page
 * @param ctx The component context (props if client side)
 * @export
 */
export const auth = (ctx: any) => {
  
  const { token } = nextCookie(ctx)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {

      if (ctx && ctx.res) {
        ctx.res.writeHead(302, { Location: '/profile/login' })
        ctx.res.end()
      } else {
        console.log("[auth][server] WTF !");
        return null
      }
    } else {      
      Router.push('/profile/login')
    }
  }

  return token
}


/**
 * Will delete the token cookie, disconnect all sessions and redirect to
 * root page.
 * @export
 */
export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`)
  Router.push('/')
}


/**
 * Wraps a component by providing it the user token trough the props.
 * @param WrappedComponent the component to wrap
 * @export
 */
export const withUserToken = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const token = props.token || nextCookie(props).token

    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/users/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])    

    return <WrappedComponent {...props} token={token} />
  }

  // @TODO 🕵🏻‍♀️
  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx)
    // console.log("[Server] Fetched token: ", { token });
    
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}

/**
 * Wraps a component by providing it the user token trough the props.
 * If there is no token, redirects the user to the login page.
 * @param WrappedComponent the component to wrap
 * @export
 */
export const withAuthSync = (WrappedComponent: any) => {

  const Wrapper = (props: any) => {
    
    const token = props.token || auth(props)
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        Router.push('/users/login')
      }
    }

    useEffect(() => {
      
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} token={token} />
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    
    const token = auth(ctx)
    
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  

  return Wrapper
}


export const propsFromContext = (ctx: any) => {
  const { token } = nextCookie(ctx)
  const locale = ctx.req && ctx.req.locale || 'fr'
  return { token, locale, mama: 'mia' }
}