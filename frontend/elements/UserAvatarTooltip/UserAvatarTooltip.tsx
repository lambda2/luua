import React from 'react'
import Link from 'next/link';
import { Popover, Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import ROUTES from '../../routes/manage';

interface Props {
  thumb_url?: string
  admin?: string
  role?: string
  first_name?: string
  last_name?: string
  username: string
}
/**
 * Show a tooltip with additional user infos
 */
const UserAvatarTooltip: React.FC<Props> = ({
  thumb_url,
  admin,
  role,
  first_name,
  last_name,
  username
}) => {

  const { t } = useLocale()


  const PopupContent = () => {
    return <>
      <div>{first_name && last_name && <span>{first_name} {last_name}</span>}</div>
    </>
  }

  const PopupTitle = () => {
    return <Link {...ROUTES.users.show(username)}>
      <a>
        <span>@{username}</span>
        {' '}{admin && <Tag color="red">{t('admin')}</Tag>}
        {' '}{role && <Tag color="blue">{role}</Tag>}
      </a>
    </Link>
  }

  return (
    
    <Popover content={PopupContent} title={PopupTitle}>
      <span>
        <b>{(first_name && last_name) ? `${first_name} ${last_name}` : username}</b>
      </span>
    </Popover>

  );
};

UserAvatarTooltip.displayName = 'UserAvatarTooltip'

export default UserAvatarTooltip