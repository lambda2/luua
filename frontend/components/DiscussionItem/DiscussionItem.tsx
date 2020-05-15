import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/routes'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import momentWithLocale from '../../i18n/moment';
import icons from '../../dictionaries/icons';
import UserAvatarTooltip from '../../elements/UserAvatarTooltip/UserAvatarTooltip';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import DiscussionCategoryBadge from '../../elements/DiscussionCategoryBadge/DiscussionCategoryBadge';

const { manage } = routes

interface Props {
  discussion: LightDiscussion
}

const DiscussionItem = ({ discussion }: Props) => {

  const {
    id,
    name,
    created_at,
    updated_at,
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

  return (
    <div className="DiscussionItem">
      <h5>
        {discussion_category && <DiscussionCategoryBadge size="small" text category={discussion_category} />}

        <Link key={id} {...manage.workspace.discussions.show(workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
      </h5>

      <footer>
        <ul className="text-light">
          <li className="created-by">
            {/* <span>{t('discussion.created_by')}</span> */}
            <UserAvatarTooltip text image {...user} />
          </li>
          <li className="created-at">{icons.date} {moment(updated_at).calendar()}</li>
          <li className="messages-count">{icons.comments} {t('discussion.messages_count', {count: discussion.messages_count})}</li>
          <li className="participants">

            {participants.slice(0, 5).map(u => <UserAvatarTooltip text={false} image {...u} />)}
          </li>

        </ul>
      </footer>
    </div>
  )

}

export default DiscussionItem