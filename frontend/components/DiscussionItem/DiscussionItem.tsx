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
import PageSection from 'elements/PageSection/PageSection';
import LinkedItem from 'components/LinkedItem/LinkedItem';
import Tag from 'elements/Tag/Tag';
import { Tooltip, Button } from 'antd';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import MarkdownExcerpt from 'elements/MarkdownContent/MarkdownExcerpt';

const { manage } = routes

interface Props {
  discussion: LightDiscussion
  reading?: DiscussionReading | false
  userVote?: MessageVote
  onVote?: (message: Message, vote: MessageVoteOption) => {}
  showWorkspace?: boolean
}

const DiscussionItem = ({
  discussion,
  reading,
  onVote,
  userVote,
  showWorkspace = false
}: Props) => {

  const {
    id,
    name,
    created_at,
    updated_at,
    modified_at,
    locked_at,
    user,
    slug,
    polls,
    root_message,
    workspace_id,
    workspace,
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
  const onVotePositive = () => currentUser && root_message && onVote && onVote(root_message, 'positive')
  const active = userVote?.vote === 'positive'

  return (
    <div className={classNames("DiscussionItem", { 'locked': locked_at, 'unread-messages': unread, 'read-messages': reading !== false && !unread })}>
      <aside>
       {locked_at && <Tooltip title={t('discussion.locked')}>
          <span>{icons.locked}</span>
        </Tooltip>}
      </aside>
      <h5>
        {/* {discussion_category && <li><DiscussionCategoryBadge size="small" text category={discussion_category} /></li>} */}
        {/* {showWorkspace && <div className="text-light workspace">
          <Link key={id} {...manage.workspace.show(workspace?.slug || workspace_id)}>
            <a className="text-light">
              <header>
                <UserAvatar size="small" name={workspace?.name || ''} src={workspace?.thumb_url} />
                <span className="org-title">{workspace?.name}</span>
                <span className="text-light">{' '}</span>
              </header>
            </a>
          </Link>
        </div>} */}

        <Link key={id} {...manage.workspace.discussions.show(workspace.slug || workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
        {discussion_category && <li className="discussion-category" style={{color: discussion_category.color}}>
          <Link {...manage.workspace.discussions.category.index(workspace.slug || workspace_id, discussion_category.slug)}><a>#{discussion_category.name}</a></Link>
        </li>}
      </h5>

      {/* The first message's first line of content */}
      {discussion.root_message && <div>
        <MarkdownExcerpt content={discussion.root_message.content} />
      </div>}

      {discussion.polls && discussion.polls.length > 0 && <PageSection type='default' className="discussion-margin">
        {discussion.polls.map(p => <LinkedItem type='poll' linked={p} key={p.id} />)}
      </PageSection>}

      {discussion.missions && discussion.missions.length > 0 && <PageSection type='default' className="discussion-margin">
        {discussion.missions.map(p => <LinkedItem type='mission' linked={p} key={p.id} />)}
      </PageSection>}

      <footer>
        <ul className="text-light">
          {/* <li key="created-by" className="created-by">
            <UserAvatarTooltip text image {...user} />
          </li> */}
          {showWorkspace && <li className="workspace">
            <Link key={id} {...manage.workspace.show(discussion.workspace?.slug || discussion.workspace_id)}>
              <a>
                <UserAvatar size="small" name={discussion.workspace?.name || ''} src={discussion.workspace?.thumb_url} />
                <span className="org-title">{discussion.workspace?.name}</span>
              </a>
            </Link>
          </li>}

          <li key="upvote-count" className="upvote-count">
            {root_message && onVote && <div className={classNames('vote', 'vote-up', { "vote-zero": root_message.positive_vote_count === 0, active })} key="vote-up">
              <span>{root_message.positive_vote_count}</span>
              <button onClick={onVotePositive}>{active ? icons.plusthumbfill : icons.plusthumb}</button>
            </div>}
          </li>
          <li key="messages-count" className="messages-count">{icons.comments} {discussion.messages_count}</li>

          <li key="created-at" className="created-at">{t('generics.published')} {moment(created_at).calendar()}</li>
          {modified_at && <li key="modified-at" className="modified-at">{icons.date} {moment(modified_at).calendar()}</li>}
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