import React, { useContext, useEffect } from 'react';

import UserContext from 'contexts/UserContext';

import DiscussionInput from 'elements/DiscussionInput/DiscussionInput';
import { create, update, destroy } from 'api/message';
import { useMutation, queryCache } from 'react-query';
import MessageList from '../MessageList/MessageList';
import Paginated from '../Paginated/Paginated';
import can from 'utils/can';
import MessageBox from 'elements/MessageBox/MessageBox';
import { useLocale } from 'hooks/useLocale';
import { vote } from 'api/message';
import { useCollection } from 'utils/http';
import Title from 'elements/Title/Title';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import { Dropdown, Menu, Button } from 'antd';
import icons from 'dictionaries/icons';
import Router from 'next/router';
import PollFormDiscussionModal from 'components/PollFormDiscussionModal/PollFormDiscussionModal';
import PageSection from 'elements/PageSection/PageSection';
import LinkedItem from 'components/LinkedItem/LinkedItem';
import omit from 'lodash/omit';
import { createItemMutation, updateItemMutation, destroyItemMutation } from 'utils/collectionMutations';
import { read, lock } from 'api/discussion';
import MissionFormDiscussionModal from 'components/MissionFormDiscussionModal/MissionFormDiscussionModal';
import usePaginatedCollection from 'hooks/usePaginatedCollection';

interface Props {
  discussion?: Discussion
  messagesEndpoint: string | false | 0 | undefined
  votesEndpoint: string | false | 0 | undefined
  initialPage?: number,
  token?: string
}

export interface MessagePayload {
  serialized_content: string,
  content: string
}

const Discussion = ({
  discussion,
  initialPage = 1,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const queryKey = `messages`
    
  const {
    resolvedData,
    latestData,
    refetch,
    page,
    nextPage,
    prevPage,
    lastPage,
    setPage,
  } = usePaginatedCollection<Message>({
    initialPage,
    token,
    endpoint: `/api/discussions/${discussion?.id}/messages`,
    queryKey,
    queryParams: { discussion_id: discussion?.id }
  })

  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<MessageVote[]>(
    `/api/discussions/${discussion?.id}/message_votes/mines`, (token || currentUser?.jwt)
  )

  const onDestroyDiscussion = async (discussion: LightDiscussion) => {
    Router.push(
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).href,
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).as
    )
  }

  // Mark the discussion as read
  useEffect(() => {
    if (discussion && currentUser) {
      read(discussion?.id, token || currentUser?.jwt)
    }
  }, [discussion?.id, currentUser?.id])

  const createMessage = async ({ content, serialized_content }: MessagePayload) => {
    if (!discussion) {
      console.error("No discussion to attatch this message !")
      return
    }

    return await create({ content, serialized_content, discussion_id: discussion.id }, currentUser?.jwt || '')
  }

  const lockDiscussion = async () => {
    if (!discussion) {
      console.error("No discussion to lock !")
      return
    }

    const lockedDiscussion = await lock(discussion.id, currentUser?.jwt || '')

    if (lockedDiscussion.data) {
      queryCache.setQueryData(`/api/discussions/${discussion.slug}`, lockedDiscussion.data)
    }
  }

  const editMessage = async (message: Message) => update(message, currentUser?.jwt || '')
  const destroyMessage = async (message: Message) => destroy(message, currentUser?.jwt || '')

  const voteMessage = async (message: Message, selectedVote: MessageVoteOption) => {
    await vote(message.id, selectedVote, currentUser?.jwt || '')
    await refetch()
    return await votesResponse?.refetch({ force: true })
  }

  const formatMessage = ({ serialized_content, content }: MessagePayload) => {
    return {
      content,
      serialized_content,
      user_id: currentUser?.id,
      user: omit(currentUser, ['image']),
      negative_vote_count: 0,
      positive_vote_count: 0,
      workspace_id: discussion?.workspace_id,
      discussion_id: discussion?.workspace_id
    }
  }

  const [onCreate] = useMutation(createMessage, createItemMutation<any, MessagePayload>(
    queryKey,
    [queryKey, { discussion_id: discussion?.id, page }],
    formatMessage
  ))

  const [onEdit] = useMutation(editMessage, updateItemMutation<Message>(
    queryKey,
    [queryKey, { discussion_id: discussion?.id, page }]
  ))

  const [onDestroy] = useMutation(destroyMessage, destroyItemMutation<Message>({
    queryKey,
    fullQueryKey: [queryKey, { discussion_id: discussion?.id, page }]
  }))

  if (!discussion) {
    return <></>
  }

  const menu = (
    <Menu>
      {can(currentUser, 'discussion.edit', discussion) &&<Menu.Item key="edit-discussion">
        <Link {...ROUTES.manage.workspace.discussions.edit(discussion?.workspace_id, discussion?.slug)}><a>{t(('form.discussion.edit'))}</a></Link>
      </Menu.Item>}

      {can(currentUser, 'discussion.create-poll', discussion) && <Menu.Item key="poll-from-discussion">
        <PollFormDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" onClick={onClick}>{t('form.discussion.create-poll')}</a>}
        />
      </Menu.Item>}

      {can(currentUser, 'discussion.create-mission', discussion) && <Menu.Item key="poll-from-mission">
        <MissionFormDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" onClick={onClick}>{t('form.discussion.create-mission')}</a>}
        />
      </Menu.Item>}

      {can(currentUser, 'discussion.lock', discussion) && !discussion.locked_at && <Menu.Item key="lock-discussion">
        <a href="#" className="text-danger" onClick={lockDiscussion}>{t(('discussion.lock'))}</a>
      </Menu.Item>}

      {can(currentUser, 'discussion.destroy', discussion) && <Menu.Item key="destroy-discussion">
        <a href="#" className="text-danger" onClick={() => onDestroyDiscussion(discussion)}>{t(('form.discussion.delete'))}</a>
      </Menu.Item>}

    </Menu>
  );

  return (
    <div className="Discussion">

      <header className="PageTitle discussion-margin">
        <Title level={"3"}>
          {discussion?.discussion_category && <DiscussionCategoryBadge size="large" text category={discussion?.discussion_category} />}
          {discussion?.name}
        </Title>
        <aside>
          {currentUser && <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.down}</span>
            </Button>
          </Dropdown>}
        </aside>
      </header>

      {discussion.polls && discussion.polls.length > 0 && <PageSection type='default' className="discussion-margin">
        {discussion.polls.map(p => <LinkedItem type='poll' linked={p} key={p.id} />)}
      </PageSection>}

      {discussion.missions && discussion.missions.length > 0 && <PageSection type='default' className="discussion-margin">
        {discussion.missions.map(p => <LinkedItem type='mission' linked={p} key={p.id} />)}
      </PageSection>}

      <Paginated
        data={resolvedData}
        nextPage={nextPage}
        prevPage={prevPage}
        lastPage={lastPage}
        prev={() => setPage(old => Math.max(old - 1, 0))}
        next={() => setPage(old => (!latestData || !nextPage ? old : old + 1))}
        last={() => setPage(old => (!latestData || !nextPage ? old : lastPage || old))}
        first={() => setPage(1)}
        page={page && parseInt(page.toString()) || undefined}
        renderList={(messages) => <MessageList
          userVotes={votesResponse?.data}
          onVote={voteMessage}
          onEdit={onEdit}
          onDestroy={onDestroy}
          messages={messages} />}
      />

      {discussion.locked_at && <MessageBox>{t('discussion.locked')}</MessageBox>}

      {!discussion.locked_at && (can(currentUser, 'discussion.post', discussion) &&
        <DiscussionInput onSubmit={onCreate}/> ||
        <MessageBox>{t('discussion.cant-post-auth')}</MessageBox>  
      )}
      {!discussion.locked_at && <div className="MessageListItemActionBar">
        <span>{t('generics.or')}</span>
        {' '}
        <PollFormDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" className="shadowed-button"onClick={onClick}>{t('form.discussion.create-poll')}</a>}
        />
        {' '}
        <MissionFormDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" className="shadowed-button"onClick={onClick}>{t('form.discussion.create-mission')}</a>}
        />
      </div>}

    </div>
  )

}

export default Discussion