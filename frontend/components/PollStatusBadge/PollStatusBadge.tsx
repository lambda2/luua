import React from 'react';
import { useLocale } from 'hooks/useLocale';
import classNames from 'classnames';
import icons from 'dictionaries/icons';
import { Tooltip } from 'antd';
import momentWithLocale from 'i18n/moment';
import { statusForPoll } from 'utils/poll';

interface Props {
  poll : LightPoll
}

const PollStatusBadge = ({
  poll
}: Props) => {

  const { t, language } = useLocale()

  const pollStatus = statusForPoll(poll)

  const renderBadge = () => {

    switch (pollStatus) {
      case 'draft':
        return <>
          {icons.poll.draft}{' '}
          <Tooltip title={t(`poll.status.draft.title`)}>
            <span>{t(`poll.status.draft.description`)}</span>
          </Tooltip>
        </>
      case 'closed':
        return <>
          {icons.poll.closed}{' '}
          <Tooltip title={t(`poll.status.closed.title`)}>
            <span>{t(`poll.status.closed.description`)}</span>
          </Tooltip>
        </>
      case 'ended':
        return <>
          {icons.poll.ended}{' '}
          <Tooltip title={t(`poll.status.ended.title`)}>
            <span>{t(`poll.status.ended.description`)}</span>
          </Tooltip>
        </>
      case 'started':
        return <>
          {icons.poll.started}{' '}
          <Tooltip title={t(`poll.status.started.title`)}>
            <span>{t(`poll.status.started.description`)}</span>
          </Tooltip>
        </>
    }
  }

  return (
    <span className={classNames("PollStatusBadge", `status-${pollStatus}`)}>
      {renderBadge()}
    </span>
  )

}

export default PollStatusBadge