import React, { useContext } from 'react'
import { useCollection, fetchInitialData} from '../../utils/http'
import { withAuthSync } from '../../utils/auth'
import NetworkBoundary from '../../components/NetworkBoudary/NetworkBoudary'
import NotificationList from '../../components/NotificationList/NotificationList'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import PageTitle from '../../elements/PageTitle/PageTitle'
import { Button } from 'antd'
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext'
import UserHeader from '../../components/UserHeader/UserHeader'

/**
 * The user's notifications page
 */
const Notifications = (
  { initialData, token }:
  { initialData: UserNotification[], token?: string }
) => {

  const { t } = useLocale()

  const response = useCollection<UserNotification[]>(
    `/api/me/notifications`, token, {}, { initialData }
  )

  const { currentUser, readAllNotifications, readNotification } = useContext(UserContext)
  
  const onReadAll = async () => {
    await readAllNotifications()
    await response.refetch()
  }
  
  const onRead = async (id: string | number) => {
    await readNotification(id)
    await response.refetch()
  }

  return (
    <NetworkBoundary<UserNotification[]> {...response}>
      <ContentLayout>
        {currentUser && <UserHeader user={currentUser as AuthedUser} active='notifications' />}

        <PageTitle
          title={t('menu.notifications')}
          extra={[
            <Button onClick={onReadAll}>{t('notifications.read-all')}</Button>
          ]}
        />
        <NotificationList onRead={onRead} data={response.data as UserNotification[]} />
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