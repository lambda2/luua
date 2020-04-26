import React from 'react'
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
// import './WorkspaceUserAvatar.module.less'
import { cdnUrl } from '../../utils/http';
import { Popover, Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';

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
    `https://robohash.org/${name || 'default'}.png?size=200x200`

  const { t } = useLocale()

  const renderRoleBadge = () => {
    if (admin) {
      <span className="badge badge-admin"></span>
    }
  }

  const PopupContent = () => {
    return <>
      <div>{admin && <Tag color="red">{t('admin')}</Tag>}</div>
      <div>{role && <Tag color="blue">{role}</Tag>}</div>
      <div>{first_name && last_name && <span>{first_name} {last_name}</span>}</div>
    </>
  }

  const PopupTitle = () => {
    return <span>@{username}</span>
  }

  return (
    
    <Popover content={PopupContent} title={PopupTitle}>
      <div className="workspace-user-avatar">
        <img src={imgOrPlaceholder} alt={username} />
        {renderRoleBadge()}
      </div>
    </Popover>

  );
};

WorkspaceUserAvatar.displayName = 'WorkspaceUserAvatar'

export default WorkspaceUserAvatar