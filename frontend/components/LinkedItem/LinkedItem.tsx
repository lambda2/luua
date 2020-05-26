import React from 'react';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import icons from 'dictionaries/icons';
import { statusForPoll } from 'utils/poll';
import Tag from 'elements/Tag/Tag';

const { manage } = routes

interface LinkedPoll {
  type: 'poll'
  linked: LightPoll
}

interface LinkedDiscussion {
  type: 'discussion'
  linked: LightDiscussion
}

interface LinkedMission {
  type: 'mission'
  linked: LightMission
}


type LinkedObject = LinkedMission | LinkedPoll | LinkedDiscussion

const LinkedItem = (props: LinkedObject) => {

  const { t } = useLocale()

  const renderPoll = (linked: LightPoll) => {
    const pollStatus = statusForPoll(linked)

    return (
      <div className="LinkedItem">
          <Link key={linked.id} {...manage.workspace.polls.show(linked.workspace_id, linked.slug)}>
            <a>
              <Tag>{t('menu.vote')}</Tag>
              {' '}
              <Tag>{(icons.poll as any)[pollStatus as any]} {t(`poll.status.${pollStatus}.title`)}</Tag>
              {' '}
              <span>{linked.name}</span>
            </a>
          </Link>
      </div>
    )

  }

  switch (props.type) {
    case 'poll':
      return renderPoll(props.linked)
    default:
      console.error("Unable to find type ", props.type, { props });
      return <span></span>
  }
}

export default LinkedItem