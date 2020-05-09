import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar, Tooltip } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
// import './MissionItemMeta.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import icons from '../../dictionaries/icons';
import momentWithLocale from '../../i18n/moment';
import MissionUserSmallBar from '../MissionUserSmallBar/MissionUserSmallBar';

const { manage } = routes

interface Props {
  mission: LightMission,
  currentUser?: AuthedUser | null
}


/**
 * This shows the metadata around a mission, like location, start date etc...
 */
const MissionItemMeta = ({
  mission,
  currentUser
}: Props) => {

  const {
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
    participant_count,
    accepted_count,
    // modified_by,
    slug,
    // mission_category,
  } = mission

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const renderVisibility = () => {
    switch (visibility) {
      case 'draft':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.draft.description', {name: workspace?.name})}>
          <span>{t('form.mission.visibilities.draft.title')} </span>
        </Tooltip></li>)
      case 'hidden':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.hidden.description', {name: workspace?.name})}>
          <span>{t('form.mission.visibilities.hidden.title')} </span>
        </Tooltip></li>)
      case 'protected':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.protected.description', {name: workspace?.name})}>
          <span>{t('form.mission.visibilities.protected.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.mission.visibilities.public.description', {name: workspace?.name})}>
          <span>{t('form.mission.visibilities.public.title')} </span>
        </Tooltip></li>)
    }
  }
  
  return (
    <ul className="text-light">
      {currentUser && renderVisibility()}
      <li className="physical">{icons.location.physical} {physical ? t('location.physical') : t('location.online')}</li>
      {begin_at && end_at && <li className="begin-at">{icons.date} {t('mission.from-to', { start: moment(begin_at).calendar().toLowerCase(), end: moment(end_at).calendar().toLowerCase() })}</li>}
      {begin_at && !end_at && <li className="begin-at">{icons.date} {t('mission.starts')} {moment(begin_at).calendar().toLowerCase()}</li>}
      {end_at && !begin_at && <li className="end-at">{icons.date} {t('mission.ends')} {moment(end_at).calendar().toLowerCase()}</li>}
      <li>
        {icons.user} {accepted_count} / {participant_count || '∞'}
      </li>

      <li className="skills">
        {icons.skills} {skills.length > 0 ?
          skills.map((s: string) => <Tag key={s}>{s}</Tag>) :
          <span className="text-lighter">{t('mission_user.no-skills-short')}</span>}
      </li>
    </ul>
  )

}

export default MissionItemMeta