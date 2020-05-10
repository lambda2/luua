import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext';
import MissionFullMeta from '../../components/MissionFullMeta/MissionFullMeta';
import MissionUserStatusBadge from '../../components/MissionUserStatusBadge/MissionUserStatusBadge';

interface Props {
  mission: BaseMission,
  application?: LightMissionUser
}

/**
 * The left part of most of missions pages.
 * It simply show useful informations about the selected mission
 */
const MissionLeftMenu = ({
  mission,
  application
}: Props) => {

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
