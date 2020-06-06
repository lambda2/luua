import React from 'react';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import icons from 'dictionaries/icons';
import { statusForPoll } from 'utils/poll';
import Tag from 'elements/Tag/Tag';
import Badge from 'elements/Badge/Badge';
import MissionStatusBadge from 'components/MissionStatusBadge/MissionStatusBadge';
import PollEmbed from 'components/Poll/PollEmbed';

const { manage } = routes

interface EmbedMessagePoll {
  resource_type: 'Poll'
  resource: EmbedPoll
}

interface EmbedMessageMission {
  resource_type: 'Mission'
  resource: LightMission
}

type EmbedMessageObject = EmbedMessageMission | EmbedMessagePoll

const EmbedMessageItem = (props: EmbedMessageObject) => {

  const { t } = useLocale()

  const renderMission = (resource: LightMission) => {
    // const pollStatus = statusForPoll(resource)

    return (
      <div className="EmbedMessageItem">
          <Link key={resource.id} {...manage.workspace.missions.show(resource.workspace_id, resource.slug)}>
            <a>
              <Tag><b>{t('menu.mission')}</b></Tag>
              {' '}
              <MissionStatusBadge status={resource.status} />
              {' '}

              <span>{resource.name}</span>
            </a>
          </Link>
      </div>
    )
  }

  const renderPoll = (resource: EmbedPoll) => {
    const pollStatus = statusForPoll(resource)

    return (
      <div className="EmbedMessageItem">
        <PollEmbed poll={resource} />
      </div>
    )

  }

  switch (props.resource_type) {
    case 'Poll':
      return renderPoll(props.resource)
    case 'Mission':
      return renderMission(props.resource)
    default:
      // console.error("Unable to find type ", props.type, { props });
      return <span></span>
  }
}

export default EmbedMessageItem