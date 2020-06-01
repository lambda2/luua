import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import MissionFullMeta from 'components/MissionFullMeta/MissionFullMeta';
import MissionUserStatusBadge from 'components/MissionUserStatusBadge/MissionUserStatusBadge';
import MissionStatusBadge from 'components/MissionStatusBadge/MissionStatusBadge';
import MenuTitle from 'elements/MenuTitle/MenuTitle';
import { useLocale } from 'hooks/useLocale';

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
  const { t } = useLocale()
  
  return (<aside className="MissionLeftMenu">
    <MenuTitle>{t('menu.mission')}</MenuTitle>
    <ul className="text-light">
      <li>
        <MissionStatusBadge status={mission.status} />
      </li>
    </ul>
    <MissionFullMeta mission={mission} currentUser={currentUser}/>
    {application && <>
      <MenuTitle>{t('mission.your-application')}</MenuTitle>
      <ul className="text-light">
        <li>
          <MissionUserStatusBadge mission={mission} status={application.status} />
        </li>
      </ul>
    </>}

  </aside>)
}

export default MissionLeftMenu
