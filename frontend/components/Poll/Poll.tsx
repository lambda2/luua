import React, { useContext } from 'react';

import UserContext from 'contexts/UserContext';
import { destroy, vote, close } from 'api/poll';
import can from 'utils/can';
import { useLocale } from 'hooks/useLocale';
import Title from 'elements/Title/Title';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import { Dropdown, Menu, Button } from 'antd';
import icons from 'dictionaries/icons';
import Router from 'next/router';
import PollVoteOption from 'components/PollVoteOption/PollVoteOption';
import { useCollection } from 'utils/http';
import MessageBox from 'elements/MessageBox/MessageBox';
import PollVoteResult from 'components/PollVoteResult/PollVoteResult';
import PageSection from 'elements/PageSection/PageSection';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import discussion from 'pages/manage/[workspace_id]/missions/[id]/discussion';
import MessageList from 'components/MessageList/MessageList';
import LinkedItem from 'components/LinkedItem/LinkedItem';

interface Props {
  poll?: Poll
  messagesEndpoint: string | false | 0 | undefined
  votesEndpoint: string | false | 0 | undefined
  page?: number | string,
  token?: string
}

const Poll = ({
  poll,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()




  if (!poll) {
    return <></>
  }

  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<UserVote[]>(
    (currentUser !== null) && `/api/polls/${poll?.id}/user_votes/mines`, (token || currentUser?.jwt)
  )

  // @TODO this hits the browser cache each time the user is voting
  const resultResponse = useCollection<VoteResults>(
    can(currentUser, 'poll.results', poll) && `/api/polls/${poll?.id}/results`, (token || currentUser?.jwt)
  )

  const onDestroy = async (poll: LightPoll) => {
    await destroy(poll, token || currentUser?.jwt || '')
    Router.push(
      ROUTES.manage.workspace.polls.index(poll.workspace_id).href,
      ROUTES.manage.workspace.polls.index(poll.workspace_id).as
    )
  }

  const onVote = async (poll_option_id: number) => {
    if (!poll?.id) {
      return false
    }
    await vote(poll?.id, poll_option_id, token || currentUser?.jwt || '')
    await votesResponse.refetch()
    return await resultResponse?.refetch({ force: true })
  }

  const onClose = async () => {
    if (!poll?.id) {
      return false
    }
    await close(poll?.id, token || currentUser?.jwt || '')
    await votesResponse.refetch()
    return await resultResponse?.refetch({ force: true })
  }


  const menu = (
    <Menu>
      {can(currentUser, 'poll.edit', poll) &&<Menu.Item key="edit-poll">
        <Link {...ROUTES.manage.workspace.polls.edit(poll?.workspace_id, poll?.slug)}><a>{t(('form.poll.edit'))}</a></Link>
      </Menu.Item>}

      {can(currentUser, 'poll.destroy', poll) && <Menu.Item key="destroy-poll">
        <a href="#" className="text-danger" onClick={() => onDestroy(poll)}>{t(('form.poll.delete'))}</a>
      </Menu.Item>}
    </Menu>
  );

  const isClosed = poll.closed_at !== null && resultResponse?.data ? true : false
  const isDraft = poll.visibility === 'draft'
  const isVotable = poll.visibility === 'draft'

  return (
    <div className="Poll">

      <header className="PageTitle PollTitle">
        <Title level={"3"}>
          {poll?.discussion_category && <DiscussionCategoryBadge size="large" text category={poll?.discussion_category} />}
          {poll?.name}
        </Title>
        <aside>
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.down}</span>
            </Button>
          </Dropdown>
        </aside>
      </header>

      {poll.description && <MarkdownContent content={poll.description} /> || <p className="text-light">{t('generics.no-description')}</p>}

      {poll.discussion && <PageSection type='boxed' className="discussion-margin">
        <LinkedItem type='discussion' linked={poll.discussion} key={poll.discussion.id} />
      </PageSection>}

      {isDraft && <MessageBox>
        {t('poll.draft-cant-vote')}
      </MessageBox>}



      {/* Show the vote options */}
        {!isDraft && !isClosed && <PageSection title={t('poll.options')}>
        {poll.poll_options.map(po => <PollVoteOption
          poll={poll}
          userVote={votesResponse.data}
          voteOption={po}
          key={po.id}
          onVote={onVote}
        />)}
        </PageSection>}

      {/* Show the vote results */}
      {isClosed && <PageSection title={t('poll.results')}>
        <PollVoteResult poll={poll} {...resultResponse!.data as VoteResults} />
      </PageSection>}

      {/* {poll.discussion && <PageSection title={t('poll.linked-to-discussion')}>
        <DiscussionItem discussion={poll.discussion} />

      </PageSection>} */}

      {/* Buttons to close the poll if available */}
      {can(currentUser, 'poll.close', poll) && poll.closed_at === null && <PageSection>
        <Button className="text-danger" onClick={onClose}>{t('poll.actions.close')}</Button>
      </PageSection>}

      
    </div>
  )

}

export default Poll