import React, { useContext } from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import InvitationNotification from '../NotificationItem/InvitationNotification';
import WorkspaceRequestNotification from '../NotificationItem/WorkspaceRequestNotification';
import List from '../../elements/List/List';
import PageSection from '../../elements/PageSection/PageSection';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: UserNotification[],
  onRead: (id: string | number) => Promise<void>
}

const NotificationList = ({ data, onRead }: Props) => {


  const notificationForType = (type: string) => {
    const [ns, target, action] = type.split('.')

    switch (type) {
      case 'workspace.invitation.created':
        return InvitationNotification
      case 'workspace.request.created':
        return WorkspaceRequestNotification
      default:
        return NotificationItem
    }
  }
  const { t } = useLocale()
  
  return (
  <>
      <PageSection>
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: UserNotification) => {
            const Not = notificationForType(item.code)
            return <Not onRead={onRead} notification={item} />
          }}
        />
      </PageSection>
  </>)
}

export default NotificationList