import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import momentWithLocale from 'i18n/moment';
import icons from 'dictionaries/icons';
import UserAvatarTooltip from 'elements/UserAvatarTooltip/UserAvatarTooltip';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import { statusForPoll } from 'utils/poll';

const { manage } = routes

interface Linked { }

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


interface Props {
  linked: LinkedMission | LinkedPoll | LinkedDiscussion
}

const LinkedItem = ({ type, linked }: LinkedMission | LinkedPoll | LinkedDiscussion) => {

  const {
    id,
    name,
    workspace_id,
  } = linked

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  switch (type) {
    case 'poll':
      const pollStatus = statusForPoll(linked)

      return (
        <div className="LinkedItem">
          <h5>
            {discussion_category && <DiscussionCategoryBadge size="small" text category={discussion_category} />}

            <Link key={id} {...manage.workspace.polls.show(workspace_id, slug)}>
              <a>
                {name}
              </a>
            </Link>
          </h5>

          <footer>
            <ul className="text-light">
              <li key="created-by" className="created-by">
                <UserAvatarTooltip text image {...user} />
              </li>
              <li key="created-at" className="created-at">{icons.date} {moment(updated_at).calendar()}</li>
              <li key="votes-count" className="votes-count">{icons.send} {t('poll.votes_count', { count: poll.vote_count })}</li>
              <li key="poll-status" className="poll-status">{(icons.poll as any)[pollStatus as any]} {t(`poll.status.${pollStatus}.title`)}</li>
              {/* <li key="participants" className="participants">
            {participants.slice(0, 5).map(u => <UserAvatarTooltip key={u.id} text={false} image {...u} />)}
          </li> */}

            </ul>
          </footer>
        </div>
      )

      break;
  
    default:
      break;
  }

}

export default LinkedItem