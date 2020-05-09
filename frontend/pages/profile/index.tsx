import React from 'react'
import Router from 'next/router'
import api, { getHeaders, useCollection} from '../../utils/http'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../../utils/auth'
import NetworkBoundary from '../../components/NetworkBoudary/NetworkBoudary'
import UserProfile from '../../components/UserProfile/UserProfile'
import { NextPageContext } from 'next'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import UserHeader from '../../components/UserHeader/UserHeader'

const Profile = (
  { initialData, token }:
  { initialData: AuthedUser, token?: string }
) => {

  const response = useCollection<AuthedUser>(
    `/api/me`, token, {}, { initialData }
  )
  
  return (<>
    {response.data && <UserHeader user={response.data as AuthedUser} active='summary' />}
    <ContentLayout>
      <NetworkBoundary {...response}>
        <UserProfile {...response.data as AuthedUser} />
      </NetworkBoundary>
    </ContentLayout>
  </>)
}

Profile.getInitialProps = async (ctx: NextPageContext) => {

  // @TODO cleanup this mess
  
  const { token } = nextCookie(ctx)

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/users/login')
      : ctx?.res?.writeHead(302, { Location: '/users/login' }).end()

  try {
    const headers = getHeaders(token || '');
    const { data, status } = await api('/api/me', { headers })

    if (status < 300) {
      return data
    } else {
      console.log("Invalid on login: ", data);
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    console.log("Error, redirecting to login page: ", error);
    
    return redirectOnError()
  }
}

export default withAuthSync(Profile)