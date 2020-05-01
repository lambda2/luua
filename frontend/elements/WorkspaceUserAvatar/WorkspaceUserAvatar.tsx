import React from 'react'
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
// import './WorkspaceUserAvatar.module.less'
import { cdnUrl } from '../../utils/http';
import { Popover, Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import ROUTES from '../../routes/manage';
import UserAvatar from '../UserAvatar/UserAvatar';

interface Props extends WorkspaceUser {

}
/**
 * Our styled link
 */
const WorkspaceUserAvatar: React.FC<Props> = ({
  thumb_url,
  admin,
  role,
  first_name,
  last_name,
  username
}) => {

  const imgOrPlaceholder = thumb_url ?
    cdnUrl(thumb_url) :
    `https://robohash.org/${username || 'default'}.png?size=200x200`

  const { t } = useLocale()

  const renderRoleBadge = () => {
    if (admin) {
      <span className="badge badge-admin"></span>
    }
  }

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
      <div className="WorkspaceUserAvatar" style={{ marginRight: '5px' }}>
        <UserAvatar size="large" src={thumb_url} name={username} />
        {renderRoleBadge()}
      </div>
    </Popover>

  );
};

WorkspaceUserAvatar.displayName = 'WorkspaceUserAvatar'

export default WorkspaceUserAvatar