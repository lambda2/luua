import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/routes'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import momentWithLocale from '../../i18n/moment';
import icons from '../../dictionaries/icons';
import UserAvatarTooltip from '../../elements/UserAvatarTooltip/UserAvatarTooltip';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';

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
    // mission_category,
  } = discussion

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  return (
    <div className="DiscussionItem">
      <h5>
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
            <UserAvatarTooltip image {...user} />
          </li>
          <li className="created-at">{icons.date} {t('discussion.created_at')} {moment(created_at).calendar().toLowerCase()}</li>
          <li className="messages-count">{icons.comments} {t('discussion.messages_count', {count: discussion.messages_count})}</li>
        </ul>
      </footer>
    </div>
  )

}

export default DiscussionItem