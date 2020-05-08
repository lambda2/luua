import React, { useContext } from 'react';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import { useRouter } from 'next/router';
import TitleWithAvatar from '../../elements/TitleWithAvatar/TitleWithAvatar';
import UserAvatarTooltip from '../../elements/UserAvatarTooltip/UserAvatarTooltip';

const { manage } = routes

interface Props {
  mission: LightMission
  user: BaseUser
  status: MissionUserStatus
  id: number
}

const MissionUserItem = ({
  id,
  user,
  mission,
  status
}: Props) => {

  const { t } = useLocale()
  const { query } = useRouter()

  return (
    <div className="MissionUserItem">
      <TitleWithAvatar
        level='4'
        avatar={<UserAvatar size="large" src={user.thumb_url} name={user.username} />}
      >
        <Link key={id} {...manage.workspace.candidates.show(`${query.workspace_id}`, `${id}`)}>
          <a>
            {mission.name}
            <div className="sub-title text-light">
              <UserAvatarTooltip {...user} /> {t(`mission_user.${status}.state`, { name: mission.name })}
            </div>
          </a>
        </Link>
      </TitleWithAvatar>
    </div>
  )

}

export default MissionUserItem