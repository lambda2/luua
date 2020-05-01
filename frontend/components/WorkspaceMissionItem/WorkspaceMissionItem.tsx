import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './WorkspaceMissionItem.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import Title from '../../elements/Title/Title';

const { manage } = routes

interface Props extends LightMission {}

const WorkspaceMissionItem = ({
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

  return (
    <div className="WorkspaceMissionItem">
      <Title level='4'>
        <Link key={id} {...manage.workspace.missions.show(workspace?.slug || workspace_id, slug)}>
          <a>
            <MissionVisibilityBadge visibility={visibility} />
            {' '}
            {name}
          </a>
        </Link>
      </Title>
      <p>
        {description}
      </p>
      {skills.map((s: string) => <Tag key={s}>{s}</Tag>)}
    </div>
  )

}

export default WorkspaceMissionItem