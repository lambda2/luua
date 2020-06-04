import React from 'react'
import { withAuthSync } from 'utils/auth'
import { read } from 'api/notification'
import nextCookie from 'next-cookies'
import { linkForNotification } from 'utils/notifications'
import Router from 'next/router'

/**
 * The user's notifications page
 */
const ReadNotification = (
) => {
  Router.push('/profile/login')
  return (<>
    <p>Should have been redirected, weird...</p>
  </>)
}

ReadNotification.getInitialProps = async (ctx: any) => {
  const { token } = nextCookie(ctx)
  const notification_id = ctx.query.notification

  console.log({ notification_id });
  

  if (notification_id) {

    const { data } = await read(`${notification_id}`, token || '')
    const link = linkForNotification(data) || { href: '#' }
    console.log({ link });
    
    if (ctx && ctx.res) {
      ctx.res.writeHead(302, { Location: (link as any).as })
      ctx.res.end()
    }

  }
  return { token }
}

export default withAuthSync(ReadNotification)