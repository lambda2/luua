import React from 'react'
import Link from 'next/link';
import { Popover, Tag } from 'antd';
import { useLocale } from 'hooks/useLocale';
import ROUTES from 'routes/routes';
import UserAvatar from '../UserAvatar/UserAvatar';
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';
import momentWithLocale from 'i18n/moment';
import { nameForUser } from 'utils/user';

interface Props {
  image?: boolean
  text?: boolean
  thumb_url?: string
  admin?: string
  role?: string
  created_at?: string
  first_name?: string
  last_name?: string
  username: string
}
/**
 * Show a tooltip with additional user infos
 */
const UserAvatarTooltip = (user: Props) => {

  const {
    image,
    text = false,
    thumb_url,
    admin,
    role,
    created_at,
    first_name,
    last_name,
    username
  } = user

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)


  const PopupContent = () => {
    return <>
      <div className="text-light">{t('user.member-since')}{' '}{moment(created_at).fromNow()}</div>
    </>
  }

  const PopupTitle = () => {
    return <Link {...ROUTES.users.show(username)}>
      <a className="UserAvatarTooltip-Popup">
        {image && <aside>
          <UserMessageAvatar inline size="large" name={username} src={thumb_url} />
        </aside>}
        <main>
          <div>
            <span>@{username}</span>
            {' '}{admin && <Tag color="red">{t('admin')}</Tag>}
            {' '}{role && <Tag color="blue">{role}</Tag>}
          </div>
          <div>{first_name && last_name && <span>{first_name} {last_name}</span>}</div>
        </main>
      </a>
    </Link>
  }

  return (
    
    <Popover className="UserAvatarTooltip" content={PopupContent} title={PopupTitle}>
      <span>
        {image && <UserMessageAvatar inline size="small" name={username} src={thumb_url} />}
        {text && nameForUser(user)}
      </span>
    </Popover>

  );
};

UserAvatarTooltip.displayName = 'UserAvatarTooltip'

export default UserAvatarTooltip