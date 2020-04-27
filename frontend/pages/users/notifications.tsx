import React from 'react'
import Router from 'next/router'
import api, { getHeaders, useCollection, cdnUrl, fetchInitialData} from '../../utils/http'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../../utils/auth'
import NetworkBoundary from '../../components/NetworkBoudary/NetworkBoudary'
import NotificationList from '../../components/NotificationList/NotificationList'
import { NextPageContext } from 'next'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../elements/PageTitle/PageTitle'
import { Avatar, Typography } from 'antd'
import PrimaryLink from '../../elements/PrimaryLink/PrimaryLink'
const { Title } = Typography;
import manage from '../../routes/manage';
import { useLocale } from '../../hooks/useLocale';

const Notifications = (
  { initialData, token }:
  { initialData: UserNotification[], token?: string }
) => {

  const { t } = useLocale()

  const response = useCollection<UserNotification[]>(
    `/api/me/notifications`, token, {}, { initialData }
  )
  
  return (
    <NetworkBoundary<UserNotification[]> {...response}>
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        <PageTitle title={t('menu.notifications')} />
        <NotificationList data={response.data as UserNotification[]} />
      </ContentLayout>
    </NetworkBoundary>
  )
}

Notifications.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<UserNotification[]>(
    ctx, `/api/me/notifications`
  )
}

export default withAuthSync(Notifications)