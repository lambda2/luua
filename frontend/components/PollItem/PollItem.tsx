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

const { manage } = routes

interface Props {
  poll: LightPoll
}

const PollItem = ({ poll }: Props) => {

  const {
    id,
    name,
    created_at,
    updated_at,
    user,
    slug,
    workspace_id,
    discussion_category,
    // mission_category,
  } = poll

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  return (
    <div className="PollItem">
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
          <li key="votes-count" className="votes-count">{icons.send} {t('poll.votes_count', {count: poll.vote_count})}</li>
          {/* <li key="participants" className="participants">
            {participants.slice(0, 5).map(u => <UserAvatarTooltip key={u.id} text={false} image {...u} />)}
          </li> */}

        </ul>
      </footer>
    </div>
  )

}

export default PollItem