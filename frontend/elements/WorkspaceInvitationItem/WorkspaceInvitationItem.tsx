import React, { useContext } from 'react'
import { cdnUrl } from '../../utils/http';
import { Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import momentWithLocale from '../../i18n/moment';
import UserContext from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar/UserAvatar';
import StatusTag from '../StatusTag/StatusTag';

const WorkspaceInvitationItem: React.FC<WorkspaceInvitation> = ({
  user,
  inviter,
  status,
  send_email,
  email,
  created_at
}) => {

  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)
  const yourself = currentUser?.username === inviter.username

  const moment = momentWithLocale(language as AvailableLocale)
  return (
    <div className="WorkspaceInvitationItem">
      <aside>
        <UserAvatar src={user?.thumb_url} size="xlarge" name={user?.username || email} />
      </aside>
      <main>
        <h4>
          <span>{user?.username && `@${user?.username}` || email}</span>
          <StatusTag status={status} />
        </h4>
        <div className="text-light">
          {' '}{t('workspace_invitation.invited-by')}{' '}
          <span>@{inviter.username}</span>
          {yourself && <span>({t('generics.yourself')})</span>}
          <span>{moment(created_at).calendar()}</span>
        </div>
      </main>
    </div>
  );
};

WorkspaceInvitationItem.displayName = 'WorkspaceInvitationItem'

export default WorkspaceInvitationItem