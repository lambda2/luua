import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar, Button } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import find from 'lodash/find';
import momentWithLocale from '../../i18n/moment';
import { linkForNotification } from '../../utils/notifications';
import classNames from 'classnames';

const { explore } = routes

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
  const notificationHref = linkForNotification({ resource, link, code })


  return (
    <List.Item
      className={classNames("NotificationItem", {'unread': !viewed_at})}
      key={id}
    >
      <List.Item.Meta
        // avatar={}
        title={<>
          <Link key={id} {...notificationHref}>
            <a>
              <h2>{code === 'custom' ? title : t(`notifications.${code}.title`, resource)}</h2>
            </a>
          </Link>
          {!viewed_at && <Button onClick={() => onRead(id)}>{t('notifications.read')}</Button>}
        </>}
        description={<div>
          <p>{code === 'custom' ? content : t(`notifications.${code}.content`, resource)}</p>
          <footer>{moment(updated_at).calendar()}</footer>
        </div>}
      />
    </List.Item>
  )

}

export default NotificationItem