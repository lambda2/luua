import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import find from 'lodash/find';
import momentWithLocale from '../../i18n/moment';
import { linkForNotification } from '../../utils/notifications';

const { explore } = routes

interface Props extends UserNotification {}

const NotificationItem = ({
  id,
  title,
  content,
  link,
  code,
  resource,
  viewed_at,
  created_at,
  updated_at
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)
  const notificationHref = linkForNotification({ resource, link, code })
  return (
    <List.Item
      className="NotificationItem"
      key={id}
      actions={[
      ]}
    >
      <List.Item.Meta
        // avatar={}
        title={<Link key={id} {...notificationHref}>
          <a>
            <h2>{code === 'custom' ? title : t(`notifications.${code}.title`, resource)}</h2>
          </a>
        </Link>}
        description={<div>
          <p>{code === 'custom' ? content : t(`notifications.${code}.content`, resource)}</p>
          <footer>{moment(updated_at).calendar()}</footer>
        </div>}
      />
    </List.Item>
  )

}

export default NotificationItem