import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './WorkspaceMissionItem.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';

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
    <List.Item
      className="WorkspaceMissionItem"
      key={name}
      actions={[
        // <Button icon={<span>{icons.delete}{' '}</span>} type="link" color="#f5222d" size="small" key="delete-mission">{' '}{t('delete')}</Button>,
        // <Button icon={<span>{icons.question}{' '}</span>} type="link" size="small" key="edit-mission">{' '}{t('edit')}</Button>,
        // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]}
      // extra={
      //   <img
      //     width={272}
      //     alt="logo"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      //   />
      // }
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.avatar} />}
        title={<Link key={id} {...manage.workspace.missions.show(workspace?.slug || workspace_id, slug)}>
          <a>
            <h2>
              <MissionVisibilityBadge visibility={visibility} />
              {' '}
              {name}
            </h2>
          </a>
        </Link>}
        description={description}
      />
      {skills.map((s: string) => <Tag key={s}>{s}</Tag>)}
    </List.Item>
  )

}

export default WorkspaceMissionItem