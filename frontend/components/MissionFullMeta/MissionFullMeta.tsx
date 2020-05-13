import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useLocale } from '../../hooks/useLocale';
import icons from '../../dictionaries/icons';
import momentWithLocale from '../../i18n/moment';

interface Props {
  mission: BaseMission,
  currentUser?: AuthedUser | null
}


/**
 * This shows ALL the metadata around a mission, like location, start date etc...
 * This is used on the side of a mission page
 */
const MissionFullMeta = ({
  mission,
  currentUser
}: Props) => {

  const {
    id,
    name,
    // mission_category_id,
    physical,
    workspace,
    visibility,
    begin_at,
    end_at,
    accepted_count,
    participant_count,
  } = mission

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const renderVisibility = () => {
    switch (visibility) {
      case 'draft':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.draft.description', { name: workspace?.name })}>
          <span>{t('form.mission.visibilities.draft.title')} </span>
        </Tooltip></li>)
      case 'hidden':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.hidden.description', { name: workspace?.name })}>
          <span>{t('form.mission.visibilities.hidden.title')} </span>
        </Tooltip></li>)
      case 'protected':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.protected.description', { name: workspace?.name })}>
          <span>{t('form.mission.visibilities.protected.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.public.description', { name: workspace?.name })}>
          <span>{t('form.mission.visibilities.public.title')} </span>
        </Tooltip></li>)
    }
  }

  return (
    <ul className="text-light">
      {renderVisibility()}
      <li>
        {icons.user} {t('mission.contributors')}: {accepted_count} / {participant_count || '∞'}
      </li>
      <li className="physical">{icons.location.physical} { physical ? t('location.physical') : t('location.online')}</li>
      {/* {currentUser && <li className="visibility">{visibility}</li>} */}
      {begin_at && <li className="begin-at">{icons.date} {t('mission.starts')} <b>{moment(begin_at).calendar().toLowerCase()}</b></li>}
      {end_at && <li className="end-at">{icons.date} {t('mission.ends')} <b>{moment(end_at).calendar().toLowerCase()}</b></li>}
    </ul>
  )

}

export default MissionFullMeta