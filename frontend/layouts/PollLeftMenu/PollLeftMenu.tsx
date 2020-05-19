import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import MissionFullMeta from 'components/MissionFullMeta/MissionFullMeta';
import MissionUserStatusBadge from 'components/MissionUserStatusBadge/MissionUserStatusBadge';
import { Tooltip } from 'antd';
import icons from 'dictionaries/icons';
import { useLocale } from 'hooks/useLocale';
import momentWithLocale from 'i18n/moment';

interface Props {
  poll: LightPoll
}

/**
 * The left part of most of polls pages.
 * It simply show useful informations about the selected poll
 */
const PollLeftMenu = ({
  poll
}: Props) => {

  const { currentUser } = useContext(UserContext)

  const {
    id,
    name,
    // mission_category_id,
    // physical,
    // workspace,
    visibility,
    anonymity,
    authentication,
    poll_type,
    reveal,
    begin_at,
    end_at,
    vote_count
  } = poll

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const renderVisibility = () => {
    switch (visibility) {
      case 'draft':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.poll.visibilities.draft.description')}>
          <span>{t('form.poll.visibilities.draft.title')} </span>
        </Tooltip></li>)
      case 'hidden':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.poll.visibilities.hidden.description')}>
          <span>{t('form.poll.visibilities.hidden.title')} </span>
        </Tooltip></li>)
      case 'protected':
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.poll.visibilities.protected.description')}>
          <span>{t('form.poll.visibilities.protected.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.visibility[visibility]} <Tooltip title={t('form.poll.visibilities.public.description')}>
          <span>{t('form.poll.visibilities.public.title')} </span>
        </Tooltip></li>)
    }
  }

  const renderAnonymity = () => {
    switch (anonymity) {
      case 'anonymous':
        return (<li>{icons.anonymity[anonymity]} <Tooltip title={t('form.poll.anonymity.anonymous.description')}>
          <span>{t('form.poll.anonymity.anonymous.title')} </span>
        </Tooltip></li>)
      case 'not_anonymous':
        return (<li>{icons.anonymity[anonymity]} <Tooltip title={t('form.poll.anonymity.not_anonymous.description')}>
          <span>{t('form.poll.anonymity.not_anonymous.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.anonymity[anonymity]} <Tooltip title={t('form.poll.anonymity.open.description')}>
          <span>{t('form.poll.anonymity.open.title')} </span>
        </Tooltip></li>)
    }
  }

  const renderAuthentication = () => {
    switch (authentication) {
      case 'not_required':
        return (<li>{icons.authentication[authentication]} <Tooltip title={t('form.poll.authentication.not_required.description')}>
          <span>{t('form.poll.authentication.not_required.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.authentication[authentication]} <Tooltip title={t('form.poll.authentication.required.description')}>
          <span>{t('form.poll.authentication.required.title')} </span>
        </Tooltip></li>)
    }
  }

  const renderReveal = () => {
    switch (reveal) {
      case 'always':
        return (<li>{icons.reveal[reveal]} <Tooltip title={t('form.poll.reveal.always.description')}>
          <span>{t('form.poll.reveal.always.title')} </span>
        </Tooltip></li>)
      case 'on_close':
        return (<li>{icons.reveal[reveal]} <Tooltip title={t('form.poll.reveal.on_close.description')}>
          <span>{t('form.poll.reveal.on_close.title')} </span>
        </Tooltip></li>)
      default:
        return (<li>{icons.reveal[reveal]} <Tooltip title={t('form.poll.reveal.on_vote.description')}>
          <span>{t('form.poll.reveal.on_vote.title')} </span>
        </Tooltip></li>)
    }
  }

  return (<aside className="PollLeftMenu">
    {/* {application && <ul className="text-light">
      <li>
        <MissionUserStatusBadge poll={poll} status={application.status} />
      </li>
    </ul>} */}
    <ul className="text-light">
      {renderVisibility()}
      {renderAnonymity()}
      {renderAuthentication()}
      {renderReveal()}
      <li>
        {icons.user} {t('poll.participants')}: {vote_count}
      </li>
      {/* <li className="physical">{icons.location.physical} {physical ? t('location.physical') : t('location.online')}</li> */}
      {/* {currentUser && <li className="visibility">{visibility}</li>} */}
      {begin_at && <li className="begin-at">{icons.date} {t('poll.starts')} <b>{moment(begin_at).calendar().toLowerCase()}</b></li>}
      {end_at && <li className="end-at">{icons.date} {t('poll.ends')} <b>{moment(end_at).calendar().toLowerCase()}</b></li>}
    </ul>
  </aside>)
}

export default PollLeftMenu
