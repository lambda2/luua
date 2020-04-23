import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './MissionItem.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import { find } from 'lodash';
import MissionItemMeta from '../MissionItemMeta/MissionItemMeta';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';
import CandidateStatusStep from '../../elements/CandidateStatusStep/CandidateStatusStep';
import MessageBox from '../../elements/MessageBox/MessageBox';

const { explore } = routes

interface Props extends LightMission {}

const MissionItem = ({
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
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const mu = find(currentUser?.mission_users || [], {mission_id: id})
  return (
    <List.Item
      className="MissionItem"
      key={name}
      actions={[
      ]}
    >
      <List.Item.Meta
        // avatar={}
        title={<Link key={id} {...explore.missions.show(slug)}>
          <a>
            <header>
              <Avatar size="small" src={cdnUrl(workspace?.thumb_url || '')} />
              <span className="org-title">{ workspace?.name }</span>
            </header>
            <h2>{name}</h2>
          </a>
        </Link>}
        description={<div>
          {mu && <MessageBox>
            <CandidateStatusStep mission_user={mu as MissionUser} />
            <p>{t(`mission_user.${mu.status}.state-user`, { name: name })}</p>
          </MessageBox>}

          <MissionItemMeta skills={skills} />
          {/* <MissionSkillsForUser
            mission_skills={skills}
            user_skills={currentUser?.user_skills}
          /> */}
          <p>{description}</p>
        </div>}
      />
    </List.Item>
  )

}

export default MissionItem