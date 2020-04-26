import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { List, Tag } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './MissionUserItem.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';
import { useRouter } from 'next/router';


const { explore, manage } = routes

interface Props extends MissionUser {}

const MissionUserItem = ({
  id,
  user,
  mission,
  status
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  const { query } = useRouter()

  return (
    <List.Item
      className="MissionUserItem"
      key={id}
      actions={[
      ]}
    >
      <List.Item.Meta
        avatar={<UserAvatar
          name={user.username}
          size="default"
          src={user.thumb_url}
        />}
        title={<Link key={id} {...manage.workspace.candidates.show(`${query.workspace_id}`, `${id}`) }>
          <a>
            <header>
              <span className="org-title">
                {user.username}{' '}
                {t(`mission_user.${status}.state`, { name: mission.name })}
              </span>
            </header>
          </a>
        </Link>}
        description={<div>

        </div>}
      />
    </List.Item>
  )

}

export default MissionUserItem