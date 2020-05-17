import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import find from 'lodash/find';
import MissionItemMeta from '../MissionItemMeta/MissionItemMeta';
import MissionUserStatusBadge from '../MissionUserStatusBadge/MissionUserStatusBadge';
import classNames from 'classnames';

const { manage } = routes

interface Props {
  mission: LightMission
  activeWorkspace?: number
}

const MissionItem = ({ mission, activeWorkspace }: Props) => {

  const {
    id,
    name,
    workspace_id,
    workspace,
    slug,
  } = mission

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const mu = find(currentUser?.mission_users || [], {mission_id: id})
  return (
    <div className={classNames("MissionItem", `mission-${mu ? 'candidated' : 'none'}`, `mission-${mu?.status || 'none'}`)}>
      <h5>
        <Link key={id} {...manage.workspace.missions.show(workspace?.slug || workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
        {mu && <MissionUserStatusBadge mission={mission} status={mu.status} />}
      </h5>

      <footer>
        <MissionItemMeta mission={mission} showWorkspace={!activeWorkspace || activeWorkspace !== workspace_id} currentUser={currentUser} />
      </footer>
    </div>
  )

}

export default MissionItem