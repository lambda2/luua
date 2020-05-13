import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Button } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import momentWithLocale from '../../i18n/moment';
import { linkForNotification } from '../../utils/notifications';
import classNames from 'classnames';

interface Props {
  notification: UserNotification,
  onRead: (id: string | number) => Promise<void>
}

const NotificationItem = ({notification, onRead}: Props) => {

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
  
  const description = code === 'custom' ? content : t(`notifications.${code}.content`, resource)
  
  return (
    <div className={classNames("NotificationItem", {'unread': !viewed_at})}>
      <h4>
        <Link key={id} {...notificationHref}>
          <a>{code === 'custom' ? title : t(`notifications.${code}.title`, resource)}</a>
        </Link>
        {!viewed_at && <Button onClick={() => onRead(id)}>{t('notifications.read')}</Button>}
      </h4>
      <div>
        {description && `${description} - `}
        {moment(updated_at).calendar()}
      </div>
    </div>
  )

}

export default NotificationItem