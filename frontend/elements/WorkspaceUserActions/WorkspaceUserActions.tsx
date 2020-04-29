import React, { useContext } from 'react'
import { Tag, Button } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';
import find from 'lodash/find';

interface Props {
  workspace_user: WorkspaceUser,
  onRemove: (id: number) => void
  onAdmin: (id: number) => void
  onRegular: (id: number) => void
}
const WorkspaceUserActions: React.FC<Props> = ({
  workspace_user,
  onRemove,
  onRegular,
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
  const imAdmin = find((currentUser?.workspace_users || []), { workspace_id, admin: true })
  const yourself = currentUser?.username === username

  return (
    <div className="WorkspaceUserActions">
      {imAdmin && !yourself && <Button.Group>
        <Button size="small" onClick={() => onRemove(id)}>{t('workspace_user.remove')}</Button>
        {!admin && <Button size="small" onClick={() => onAdmin(id)}>{t('workspace_user.set-admin')}</Button>}
        {admin && <Button size="small" onClick={() => onRegular(id)}>{t('workspace_user.unset-admin')}</Button>}
      </Button.Group>}
    </div>
  );
};

WorkspaceUserActions.displayName = 'WorkspaceUserActions'

export default WorkspaceUserActions