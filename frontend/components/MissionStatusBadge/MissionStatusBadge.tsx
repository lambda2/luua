import React from 'react';
import { useLocale } from 'hooks/useLocale';
import classNames from 'classnames';
import icons from 'dictionaries/icons';
import { Tooltip } from 'antd';
import momentWithLocale from 'i18n/moment';

interface Props {
  status: MissionStatus
}

const MissionStatusBadge = ({
  status
}: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const renderBadge = () => {
    switch (status) {
      case 'open':
        return <>
          {icons.mission.status.open}{' '}
          <Tooltip title={t(`mission.status.open.description`)}>
            <span>{t(`mission.status.open.title`)}</span>
          </Tooltip>
        </>
      case 'pending':
        return <>
          {icons.mission.status.pending}{' '}
          <Tooltip title={t(`mission.status.pending.description`)}>
            <span>{t(`mission.status.pending.title`)}</span>
          </Tooltip>
        </>
      case 'canceled':
        return <>
          {icons.mission.status.canceled}{' '}
          <Tooltip title={t(`mission.status.canceled.description`)}>
            <span>{t(`mission.status.canceled.title`)}</span>
          </Tooltip>
        </>
      case 'started':
        return <>
          {icons.mission.status.started}{' '}
          <Tooltip title={t(`mission.status.started.description`)}>
            <span>{t(`mission.status.started.title`)}</span>
          </Tooltip>
        </>
      case 'completed':
        return <>
          {icons.mission.status.completed}{' '}
          <Tooltip title={t(`mission.status.completed.description`)}>
            <span>{t(`mission.status.completed.title`)}</span>
          </Tooltip>
        </>
    }
  }

  return (
    <span className={classNames("MissionStatusBadge", `status-${status}`)}>
      {renderBadge()}
    </span>
  )

}

export default MissionStatusBadge