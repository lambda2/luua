import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import { Button } from 'antd';
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import momentWithLocale from 'i18n/moment';
import { linkForNotification } from 'utils/notifications';
import classNames from 'classnames';
import { accept, reject } from 'api/workspace_invitations';

interface Props {
  notification: UserNotification,
  onRead: (id: string | number) => Promise<void>
}


const InvitationNotification = ({notification, onRead}: Props) => {

  const { currentUser }: { currentUser: AuthedUser | null } = useContext(UserContext)

  const onAccept = async () => {
    await accept(notification.resource.id, currentUser?.jwt || '')
    await onRead(notification.id)
  }

  const onReject = async () => {
    await reject(notification.resource.id, currentUser?.jwt || '')
    await onRead(notification.id)
  }

  const {
    id,
    title,
    content,
    link,
    code,
    resource,
    viewed_at,
    created_at,
    updated_at
  } = notification
  const { readNotification, refreshNotifications } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)
  const notificationHref = linkForNotification({ resource, link, code }) || {href: '#'}

  console.log("Rendering:", { notification });
  
  return (

    <div className={classNames("NotificationItem", { 'unread': !viewed_at })}>
      <h4>
        <Link key={id} {...notificationHref}>
          <a>{code === 'custom' ? title : t(`notifications.${code}.title`, resource)}</a>
        </Link>
        <Button.Group>
          <Button type="primary" onClick={onAccept}>{t('workspace_invitation.invite.accept')}</Button>
          <Button onClick={onReject}>{t('workspace_invitation.invite.reject')}</Button>
          {!viewed_at && <Button onClick={() => onRead(id)}>{t('notifications.read')}</Button>}
        </Button.Group>
      </h4>
      <div>
        {code === 'custom' ? content : t(`notifications.${code}.content`, resource)}
        {' - '}{moment(updated_at).calendar()}
      </div>
    </div>

  )

}

export default InvitationNotification