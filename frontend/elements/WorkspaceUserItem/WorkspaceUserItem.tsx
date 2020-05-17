import React, { useContext } from 'react'
import { cdnUrl } from 'utils/http';
import { Tag } from 'antd';
import { useLocale } from 'hooks/useLocale';
import momentWithLocale from 'i18n/moment';
import UserContext from 'contexts/UserContext';
import UserAvatar from '../UserAvatar/UserAvatar';

const WorkspaceUserItem: React.FC<WorkspaceUser> = ({
  thumb_url,
  admin,
  role,
  first_name,
  last_name,
  username,
  created_at
}) => {

  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)
  const yourself = currentUser?.username === username

  const moment = momentWithLocale(language as AvailableLocale)
  return (
    <div className="WorkspaceUserItem">
      <aside>
        <UserAvatar src={thumb_url} size="large" name={username} />
      </aside>
      <main>
        <h4>
          {first_name && last_name && <span>{first_name} {last_name}</span>}
          {admin && <Tag color="red">{t('workspace.admin')}</Tag>}
          {role && <Tag color="blue">{role}</Tag>}
          {yourself && <span className="text-light">({t('generics.yourself')})</span>}
        </h4>
        <div className="text-light">@{username} - {t('workspace.settings.member-since')}{' '}{moment(created_at).calendar()}</div>
      </main>
    </div>
  );
};

WorkspaceUserItem.displayName = 'WorkspaceUserItem'

export default WorkspaceUserItem