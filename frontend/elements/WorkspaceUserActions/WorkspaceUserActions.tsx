import React, { useContext } from 'react'
import { cdnUrl } from '../../utils/http';
import { Tag, Button } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar/UserAvatar';
import find from 'lodash/find';

interface Props {
  workspace_user: WorkspaceUser,
  onRemove: (id: number) => void
  onAdmin: (id: number) => void
}
const WorkspaceUserActions: React.FC<Props> = ({
  workspace_user,
  onRemove,
  onAdmin
}) => {

  const {
    id,
    admin,
    workspace_id,
    role,
    username,
  } = workspace_user
  
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)
  const imAdmin = find((currentUser?.workspaces_users || []), { workspace_id, admin: true })
  const yourself = currentUser?.username === username

  return (
    <div className="WorkspaceUserActions">
      {imAdmin && !yourself && <Button.Group>
        <Button size="small" type="danger" onClick={() => onRemove(id)}>{t('workspaces_user.remove')}</Button>
        <Button size="small" onClick={() => onAdmin(id)}>{t('workspaces_user.set-admin')}</Button>
      </Button.Group>}
    </div>
  );
};

WorkspaceUserActions.displayName = 'WorkspaceUserActions'

export default WorkspaceUserActions