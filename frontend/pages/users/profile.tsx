import React from 'react'
import Router from 'next/router'
import api, { getHeaders, useCollection, cdnUrl} from '../../utils/http'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../../utils/auth'
import NetworkBoundary from '../../components/NetworkBoudary/NetworkBoudary'
import UserProfile from '../../components/UserProfile/UserProfile'
import { NextPageContext } from 'next'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../elements/PageTitle/PageTitle'
import { Avatar, Typography } from 'antd'
import PrimaryLink from '../../elements/PrimaryLink/PrimaryLink'
const { Title } = Typography;
import manage from '../../routes/manage';
import { useLocale } from '../../hooks/useLocale';

const Profile = (
  { initialData, token }:
  { initialData: AuthedUser, token?: string }
) => {

  const { t } = useLocale()

  const response = useCollection<AuthedUser>(
    `/api/me`, token, {}, { initialData }
  )
  
  const imgOrPlaceholder = response.data?.thumb_url ?
    cdnUrl(response.data?.thumb_url) :
    `https://robohash.org/${response.data?.username || 'default'}.png?size=200x200`

  return (
    <ContentLayout sideMenu={<ManageLeftMenu />}>
      <NetworkBoundary {...response}>
        <UserProfile {...response.data as AuthedUser} />
      </NetworkBoundary>
    </ContentLayout>
  )
}

Profile.getInitialProps = async (ctx: NextPageContext) => {

  const { token } = nextCookie(ctx)

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/users/login')
      : ctx?.res?.writeHead(302, { Location: '/login' }).end()

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