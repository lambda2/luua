import React, { useContext, useState } from 'react';
import { Button } from 'antd';

import { useLocale } from '../../hooks/useLocale';

import MessageBox from '../../elements/MessageBox/MessageBox';
import momentWithLocale from '../../i18n/moment';

interface Props {
  onComplete: () => Promise<void>
  mission: Mission
  application: LightMissionUser
}

const MissionPerformBox = ({
  onComplete,
  mission,
  application,
}: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  /**
   * Here we will render the box accoringly to the start and end dates.
   * We can have several cases:
   * - The mission is not started yet
   * - The mission is started but not finished (end_at in the future)
   * - The mission is started and finished (end_at in the past)
   * - The mission is started and no end_at was set, so it's up to the contributor to end it
   */
  const renderDelayed = () => {
    const begin = moment(mission.begin_at)
    const end = mission.end_at && moment(mission.end_at)
    const started = begin && begin.isBefore(moment())
    const ended = started && end && end.isBefore(moment())
    
    // Mission is not staretd yet
    if (!started) {
      return (<div>
        <Button type="primary" loading>
          {t(`mission.candidate.${application.status}.starts-at`, { begin: begin.fromNow() })}
        </Button>
      </div>)
    }

    // mission is started and don't have an end date
    if (started && !end) {
      return (<div>
        <div>{t(`mission.candidate.${application.status}.description-running`)}</div>
        <Button type="primary" onClick={onComplete}>
          {t(`mission.candidate.${application.status}.button-running`)}
        </Button>
      </div>)
    }

    // mission is running
    // (mission is started and have an end date not reached yet)
    if (started && end && !ended) {
      return (<div>
        <div>{t(`mission.candidate.${application.status}.description-ended`, { end: end.fromNow() })}</div>
        <Button type="primary" onClick={onComplete}>
          {t(`mission.candidate.${application.status}.button-end`)}
        </Button>
      </div>)
    }

    // mission is running
    // (mission is started and have an end date not reached yet)
    if (started && end && ended) {
      return (<div>
        <div>{t(`mission.candidate.${application.status}.description-running`)}</div>
        <Button type="primary" loading>
          {t(`mission.candidate.${application.status}.ends-at`, { end: end.fromNow()})}
        </Button>
      </div>)
    }
  }

  const renderNormal = () => {
    return (<div>
      <div>
        <Button type="primary" onClick={onComplete}>{t(`mission.candidate.${application.status}.description`)}</Button>
      </div>
    </div>)
  }

  return (
    <div className="MissionPerformBox">
      <MessageBox title={t(`mission.candidate.${application.status}.title`)}>
        {mission.begin_at && renderDelayed() || renderNormal()}
      </MessageBox>
    </div> || <></>
  )
}

export default MissionPerformBox