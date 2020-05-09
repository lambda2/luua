import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import WorkspaceContext from '../../contexts/WorkspaceContext';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import classNames from 'classnames';
import UserContext from '../../contexts/UserContext';
import MissionFullMeta from '../../components/MissionFullMeta/MissionFullMeta';
import MissionUserStatusBadge from '../../components/MissionUserStatusBadge/MissionUserStatusBadge';

const { manage } = routes
const { workspace } = manage

interface Props {
  mission: BaseMission,
  application?: LightMissionUser
}

const MissionLeftMenu = ({
  mission,
  application
}: Props) => {

  const {
    id,
    name,
    // mission_category_id,
    physical,
    description,
    begin_at,
    end_at,
    due_at,
    organization_id,
    workspace_id,
    workspace,
    image,
    visibility,
    banner_image,
    modified_at,
    created_at,
    // modified_by,
    slug,
  } = mission

  const { t } = useLocale()
  const { pathname, query } = useRouter()
  const { currentUser } = useContext(UserContext)

  return (<aside className="MissionLeftMenu">
    {application && <ul className="text-light">
      <li>
        <MissionUserStatusBadge mission={mission} status={application.status} />
      </li>
    </ul>}
    <MissionFullMeta mission={mission} currentUser={currentUser}/>
  </aside>)


}
export default MissionLeftMenu
