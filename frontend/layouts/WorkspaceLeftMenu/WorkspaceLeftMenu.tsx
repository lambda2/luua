import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import MissionFullMeta from 'components/MissionFullMeta/MissionFullMeta';
import MissionUserStatusBadge from 'components/MissionUserStatusBadge/MissionUserStatusBadge';
import WorkspaceUserAvatar from 'elements/WorkspaceUserAvatar/WorkspaceUserAvatar';
import icons from 'dictionaries/icons';
import { useLocale } from 'hooks/useLocale';

interface Props {
  workspace: Workspace
}

/**
 * The left part of most of workspace pages.
 * It simply show useful informations about the workspace
 */
const WorkspaceLeftMenu = ({
  workspace
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (<aside className="WorkspaceLeftMenu">
    <ul className="text-light">
      <li>
        {icons.visibility.protected}{' '}{t('form.workspace.membership.short')}: {t(`form.workspace.membership.options.${workspace.membership}.title`)}
      </li>
      <li>
        {icons.mission_status.applied}{' '}{workspace.missions_count} {t('workspace.missions')}
      </li>
      <li>
        {icons.user}{' '}{workspace.users_count} {t('workspace.members')}
      </li>
      <li>
        {workspace.workspace_users.map((u: WorkspaceUser) =>
          <WorkspaceUserAvatar key={u.id} size="default" {...u} />
        )}
      </li>
    </ul>
  </aside>)
}

export default WorkspaceLeftMenu
