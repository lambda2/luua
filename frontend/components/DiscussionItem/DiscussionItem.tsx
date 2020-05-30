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
import classNames from 'classnames';

const { manage } = routes

interface Props {
  discussion: LightDiscussion
  reading?: DiscussionReading | false
}

const DiscussionItem = ({ discussion, reading }: Props) => {

  const {
    id,
    name,
    created_at,
    updated_at,
    modified_at,
    user,
    slug,
    workspace_id,
    participants,
    discussion_category,
    // mission_category,
  } = discussion

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)
  const unread = reading !== false && (
    reading === undefined ||
    moment(modified_at || created_at).isAfter(moment(reading.updated_at))
  )

  return (
    <div className={classNames("DiscussionItem", { 'unread-messages': unread, 'read-messages': reading !== false && !unread })}>
      <h5>
        {discussion_category && <li><DiscussionCategoryBadge size="small" text category={discussion_category} /></li>}
        <Link key={id} {...manage.workspace.discussions.show(workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
      </h5>

      <footer>
        <ul className="text-light">
          {/* <li key="created-by" className="created-by">
            <UserAvatarTooltip text image {...user} />
          </li> */}
          <li key="created-at" className="created-at">{t('generics.published')} {moment(created_at).calendar()}</li>
          {modified_at && <li key="modified-at" className="modified-at">{icons.date} {moment(modified_at).calendar()}</li>}
          <li key="messages-count" className="messages-count">{icons.comments} {discussion.messages_count}</li>
          {/* <li key="messages-count" className="messages-count">{icons.comments} {t('discussion.messages_count', {count: discussion.messages_count})}</li> */}
          <li key="participants" className="participants">
            {participants.slice(0, 5).map(u => <UserAvatarTooltip key={u.id} text={false} image {...u} />)}
          </li>

        </ul>
      </footer>
    </div>
  )

}

export default DiscussionItem