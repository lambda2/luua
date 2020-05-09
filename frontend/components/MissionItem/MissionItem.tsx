import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './MissionItem.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import find from 'lodash/find';
import MissionItemMeta from '../MissionItemMeta/MissionItemMeta';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';
import CandidateStatusStep from '../../elements/CandidateStatusStep/CandidateStatusStep';
import MessageBox from '../../elements/MessageBox/MessageBox';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import icons from '../../dictionaries/icons';
import momentWithLocale from '../../i18n/moment';
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
    skills,
    banner_image,
    modified_at,
    // modified_by,
    slug,
    // mission_category,
  } = mission

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const mu = find(currentUser?.mission_users || [], {mission_id: id})
  return (
    <div className={classNames("MissionItem", `mission-${mu ? 'candidated' : 'none'}`, `mission-${mu?.status || 'none'}`)}>

      {/* If the mission list is already on a workspace page, we don't display the workspace name */}
      {(!activeWorkspace || activeWorkspace !== workspace_id) && <Link key={id} {...manage.workspace.show(workspace?.slug || workspace_id)}>
        <a>
          <header>
            <Avatar size="small" src={cdnUrl(workspace?.thumb_url || '')} />
            <span className="org-title">{workspace?.name}</span>
          </header>
        </a>
      </Link>}

      <h5>
        <Link key={id} {...manage.workspace.missions.show(workspace?.slug || workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
        {mu && <MissionUserStatusBadge mission={mission} status={mu.status} />}
      </h5>

      <footer>
        <MissionItemMeta mission={mission} currentUser={currentUser} />
      </footer>
{/* 
      <div>
        {mu && <MessageBox>
          <CandidateStatusStep mission_user={mu as MissionUser} />
          <p>{t(`mission_user.${mu.status}.state-user`, { name: name })}</p>
        </MessageBox>}
      </div> */}
    </div>
  )

}

export default MissionItem