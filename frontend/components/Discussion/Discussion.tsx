import React, { useContext, useState, useCallback, useEffect } from 'react';

import UserContext from 'contexts/UserContext';
import plh from 'parse-link-header';

import DiscussionInput from 'elements/DiscussionInput/DiscussionInput';
import { create, update, destroy } from 'api/message';
import { useMutation, usePaginatedQuery } from 'react-query';
import MessageList from '../MessageList/MessageList';
import Paginated from '../Paginated/Paginated';
import can from 'utils/can';
import MessageBox from 'elements/MessageBox/MessageBox';
import { useLocale } from 'hooks/useLocale';
import { vote } from 'api/message';
import api, { useCollection, getHeaders } from 'utils/http';
import Title from 'elements/Title/Title';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import { Dropdown, Menu, Button } from 'antd';
import icons from 'dictionaries/icons';
import Router from 'next/router';
import PollFromDiscussionModal from 'components/WorkspaceInvitationModal/PollFromDiscussionModal';
import PageSection from 'elements/PageSection/PageSection';
import LinkedItem from 'components/LinkedItem/LinkedItem';
import { AxiosResponse } from 'axios';
import { curryRight } from 'lodash';
import omit from 'lodash/omit';
import { createItemMutation, updateItemMutation, destroyItemMutation } from 'utils/collectionMutations';
import { read } from 'api/discussion';

interface Props {
  discussion?: Discussion
  messagesEndpoint: string | false | 0 | undefined
  votesEndpoint: string | false | 0 | undefined
  initialPage?: number,
  token?: string
}

const Discussion = ({
  discussion,
  votesEndpoint,
  messagesEndpoint,
  initialPage = 1,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()

  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    ...authHeaders
  }

  const [page, setPage] = useState<number>(initialPage);
  const [nextPage, setNextPage] = useState<number | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<number | undefined>(undefined)
  const [lastPage, setLastPage] = useState<number | undefined>(undefined)

  const stateFromHeaders = (lastPage: AxiosResponse<Message[]>) => {
    const parsed = plh(lastPage.headers.link)
    setNextPage(parsed?.next?.page)
    setPrevPage(parsed?.prev?.page)
    setLastPage(parsed?.last?.page)
  }

  const fetchMessages = useCallback(async (key, page = 1) => {
    const res = await api<Message[]>(`${messagesEndpoint}?page=${page}`, { headers })
    stateFromHeaders(res)
    return res.data;
  }, []);

  const queryKey = `messages`

  const {
    resolvedData,
    latestData,
    refetch
  } = usePaginatedQuery<Message[], [any, any]>([queryKey, { discussion_id: discussion?.id, page }], fetchMessages, {});


  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<MessageVote[]>(
    votesEndpoint, (token || currentUser?.jwt)
  )

  const onDestroyDiscussion = async (discussion: LightDiscussion) => {
    Router.push(
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).href,
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).as
    )
  }

  useEffect(() => {
    if (discussion && currentUser) {
      read(discussion?.id, token || currentUser?.jwt)
    }
  }, [discussion?.id, currentUser?.id])

  const createMessage = async (content: string) => {
    if (!discussion) {
      console.error("No discussion to attatch this message !")
      return
    }

    return await create({ content, discussion_id: discussion.id }, currentUser?.jwt || '')
  }

  const editMessage = async (message: Message) => update(message, currentUser?.jwt || '')
  const destroyMessage = async (message: Message) => destroy(message, currentUser?.jwt || '')

  const voteMessage = async (message: Message, selectedVote: MessageVoteOption) => {
    await vote(message.id, selectedVote, currentUser?.jwt || '')
    await refetch()
    return await votesResponse?.refetch({ force: true })
  }

  const formatMessage = (content: string) => {
    return {
      content,
      user_id: currentUser?.id,
      user: omit(currentUser, ['image']),
      negative_vote_count: 0,
      positive_vote_count: 0,
      workspace_id: discussion?.workspace_id,
      discussion_id: discussion?.workspace_id
    }
  }

  const [onCreate] = useMutation(createMessage, createItemMutation<any, string>(
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
        <PollFromDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" onClick={onClick}>{t('form.discussion.create-poll')}</a>}
        />
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
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.down}</span>
            </Button>
          </Dropdown>
        </aside>
      </header>

      {discussion.polls && discussion.polls.length > 0 && <PageSection type='boxed' className="discussion-margin">
        {discussion.polls.map(p => <LinkedItem type='poll' linked={p} key={p.id} />)}
      </PageSection>}

      {/* <NetworkBoundary {...votesResponse}> */}
        <Paginated
          data={resolvedData}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          prev={() => setPage(old => Math.max(old - 1, 0))}
          next={() => setPage(old => (!latestData || !nextPage ? old : old + 1))}
          page={page && parseInt(page.toString()) || undefined}
          renderList={(messages) => <MessageList
            userVotes={votesResponse?.data}
            onVote={voteMessage}
            onEdit={onEdit}
            onDestroy={onDestroy}
            messages={messages} />}
        />
      {/* </NetworkBoundary> */}

      { can(currentUser, 'discussion.post', discussion) &&
        <DiscussionInput onSubmit={onCreate}/> ||
        <MessageBox>{t('discussion.cant-post-auth')}</MessageBox>  
      }
    </div>
  )

}

export default Discussion