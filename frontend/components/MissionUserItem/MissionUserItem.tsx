import React from 'react';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import { useRouter } from 'next/router';
import ComponentWithAvatar from 'elements/ComponentWithAvatar/ComponentWithAvatar';
import UserAvatarTooltip from 'elements/UserAvatarTooltip/UserAvatarTooltip';
import MissionUserStatusBadge from '../MissionUserStatusBadge/MissionUserStatusBadge';

const { manage } = routes

interface Props {
  activeMission?: number
  mission: LightMission
  user: BaseUser
  status: MissionUserStatus
  id: number
}

const MissionUserItem = ({
  activeMission,
  id,
  user,
  mission,
  status
}: Props) => {

  const { t } = useLocale()
  const { query } = useRouter()

  return (
    <div className="MissionUserItem">
      <ComponentWithAvatar
        avatar={<UserAvatar size="large" src={user.thumb_url} name={user.username} />}
      >
        <Link key={id} {...manage.workspace.candidates.show(`${query.workspace_id || mission.workspace_id}`, `${id}`)}>
          <a>
            <MissionUserStatusBadge mission={mission} status={status} />{' '}{(!activeMission || activeMission !== mission.id) && mission && mission.name}
            <div className="sub-title text-light">
              <UserAvatarTooltip {...user} /> {t(`mission_user.${status}.state`, { name: mission && mission.name })}
            </div>
          </a>
        </Link>
      </ComponentWithAvatar>
    </div>
  )

}

export default MissionUserItem