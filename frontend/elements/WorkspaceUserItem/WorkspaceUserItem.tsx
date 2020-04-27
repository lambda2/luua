import React from 'react'
import { cdnUrl } from '../../utils/http';
import { Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import momentWithLocale from '../../i18n/moment';

const WorkspaceUserItem: React.FC<WorkspaceUser> = ({
  thumb_url,
  admin,
  role,
  first_name,
  last_name,
  username,
  created_at
}) => {

  const imgOrPlaceholder = thumb_url ?
    cdnUrl(thumb_url) :
    `https://robohash.org/${username || 'default'}.png?size=200x200`

  const { t, language } = useLocale()

  const moment = momentWithLocale(language as AvailableLocale)
  return (
    <div className="WorkspaceUserItem">
      <aside>
        <img src={imgOrPlaceholder} alt={username} />
      </aside>
      <main>
        <h4>
          {first_name && last_name && <span>{first_name} {last_name}</span>}
          {admin && <Tag color="red">{t('admin')}</Tag>}
          {role && <Tag color="blue">{role}</Tag>}
        </h4>
        <div className="text-light">@{username} - {t('workspace.settings.memeber-since')}{' '}{moment(created_at).calendar()}</div>
      </main>
    </div>
  );
};

WorkspaceUserItem.displayName = 'WorkspaceUserItem'

export default WorkspaceUserItem