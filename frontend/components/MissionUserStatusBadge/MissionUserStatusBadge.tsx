import React, { useContext } from 'react';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import classNames from 'classnames';
import icons from '../../dictionaries/icons';
import { Tooltip } from 'antd';
import momentWithLocale from '../../i18n/moment';

interface Props {
  mission: BaseMission
  status: MissionUserStatus
}

const MissionUserStatusBadge = ({
  mission,
  status
}: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const renderBadge = () => {
    switch (status) {
      case 'accepted':
        if (mission.begin_at) {
          return <>
            {icons.mission_status.accepted}{' '}
            <Tooltip title={t(`mission_user.accepted-waiting.state`, { date: moment(mission.begin_at).calendar()})}>
              <span>{t(`mission_user.accepted-waiting.name`)}</span>
            </Tooltip>
          </>
        } else {
          return <>
            {icons.mission_status.accepted}{' '}
            <Tooltip title={t(`mission_user.accepted.state`, {name: mission.name })}>
              <span>{t(`mission_user.accepted.name`)}</span>
            </Tooltip>
          </>
        }
      case 'applied':
        return <>
          {icons.mission_status.applied}{' '}
          <Tooltip title={t(`mission_user.applied.state`, {name: mission.name })}>
            <span>{t(`mission_user.applied.name`)}</span>
          </Tooltip>
        </>
      case 'completed':
        return <>
          {icons.mission_status.completed}{' '}
          <Tooltip title={t(`mission_user.completed.state`, {name: mission.name })}>
            <span>{t(`mission_user.completed.name`)}</span>
          </Tooltip>
        </>
      case 'rejected':
        return <>
          {icons.mission_status.rejected}{' '}
          <Tooltip title={t(`mission_user.rejected.state`, {name: mission.name })}>
            <span>{t(`mission_user.rejected.name`)}</span>
          </Tooltip>
        </>
      case 'reviewed':
        return <>
          {icons.mission_status.reviewed}{' '}
          <Tooltip title={t(`mission_user.reviewed.state`, {name: mission.name })}>
            <span>{t(`mission_user.reviewed.name`)}</span>
          </Tooltip>
        </>
      case 'canceled':
        return <>
          {icons.dot}
          <Tooltip title={t(`mission_user.canceled.state`, {name: mission.name })}>
            <span>{t(`mission_user.canceled.name`)}</span>
          </Tooltip>
        </>
    }
  }

  return (
    <span className={classNames("MissionUserStatusBadge", `status-${status}`)}>
      {renderBadge()}
    </span>
  )

}

export default MissionUserStatusBadge