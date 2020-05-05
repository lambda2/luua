import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import WorkspaceContext from '../../contexts/WorkspaceContext';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import classNames from 'classnames';

const { manage } = routes
const { workspace } = manage

interface Props {
  active?: string
  workspaceId?: string | number
  missionId?: string | number
}

const MissionLeftMenu = ({
  active,
  workspaceId,
  missionId
}: Props) => {

  const { t } = useLocale()
  const { pathname, query } = useRouter()

  const workspace_id = workspaceId || (query.workspace_id && query.workspace_id.toString())
  const mission_id = missionId || (query.id && query.id.toString())

  if (!workspace_id || !mission_id) {
    return <></>
  }

  return (<ul className="MissionLeftMenu">


    <li className={classNames({ active: active == 'summary' })} key="/summary">
      <Link {...workspace.missions.show(workspace_id, mission_id)}><a>{t('mission.summary')}</a></Link>
    </li>

    <li className={classNames({ active: active == 'chat' })} key="/chat">
      <Link {...workspace.missions.discussion(workspace_id, mission_id)}><a>{t('mission.chat')}</a></Link>
    </li>


  </ul>)


}
export default MissionLeftMenu
