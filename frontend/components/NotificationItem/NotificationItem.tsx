import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import find from 'lodash/find';

const { explore } = routes

interface Props extends UserNotification {}

const NotificationItem = ({
  id,
  title,
  content,
  link,
  code,
  viewed_at,
  created_at,
  updated_at
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (
    <List.Item
      className="NotificationItem"
      key={id}
      actions={[
      ]}
    >
      <List.Item.Meta
        // avatar={}
        title={title}
        description={content}
      />
    </List.Item>
  )

}

export default NotificationItem