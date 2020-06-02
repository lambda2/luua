import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'
import { useLocale } from 'hooks/useLocale';

import { useRouter } from 'next/router';
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from 'contexts/WorkspaceContext';
import UserContext from 'contexts/UserContext';
import DiscussionList from 'components/DiscussionList/DiscussionList';
import DiscussionsLeftMenu from 'layouts/DiscussionsLeftMenu/DiscussionsLeftMenu';
import { Head } from 'components/Head/Head';
import { vote } from 'api/message';
import useInfiniteCollection from 'hooks/useInfiniteCollection';
import LoadMoreButton from 'elements/LoadMoreButton/LoadMoreButton';

/**
 * The discussions list of a workspace
 */
const Discussions = (
  { initialData, token }:
  { initialData: LightDiscussion[], token?: string }
) => {
  const { query } = useRouter()

  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  const initialPage = query.page ? parseInt(`${query.page}`) : 1
  const queryKey = `discussions`

  const {
    data,
    isFetchingMore,
    fetchNext,
    canFetchMore,
  } = useInfiniteCollection<LightDiscussion>({
    initialPage,
    token,
    endpoint: `/api/workspaces/${query.workspace_id}/discussions`,
    queryKey,
    initialData
  })

  const discussionsReadingsResponse = useCollection<DiscussionReading[]>(
    `/api/workspaces/${query.workspace_id}/discussion_readings/mines`, token, {}, {}
  )

  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<MessageVote[]>(
    `/api/workspaces/${query.workspace_id}/message_votes/mines?only_roots=true`, (token || currentUser?.jwt)
  )

  const voteMessage = async (message: Message, selectedVote: MessageVoteOption) => {
    await vote(message.id, selectedVote, currentUser?.jwt || '')
    return await votesResponse?.refetch({ force: true })
  }
  
  // const menu = (
  //   <Menu>
  //     {can(currentUser, 'discussion.create', currentWorkspace) && <Menu.Item key="create-discussion">
  //       <Link {...manage.workspace.discussions.new(`${query.workspace_id}`)}>
  //         <a>{t('discussion.create.title')}</a>
  //       </Link>
  //     </Menu.Item>}
  //   </Menu>
  // );

  const wname = initialData && initialData[0]?.workspace?.name

  return (<>
    <Head
      title={t('meta.head.pages.discussions.index.title', { workspace: { name: wname } })}
    />
    {currentWorkspace && <WorkspaceHeader
      workspace={currentWorkspace}
      active='discussions'
    />}
    <ContentLayout sideMenu={currentWorkspace && <DiscussionsLeftMenu workspace={currentWorkspace} />}>
        
      {data && data.map((d: LightDiscussion[] | undefined) => d && <DiscussionList
        readings={discussionsReadingsResponse.data}
        data={d}
        userVotes={votesResponse?.data}
        onVote={voteMessage}
      />)}
      <LoadMoreButton isFetchingMore={isFetchingMore} canFetchMore={canFetchMore} fetchMore={fetchNext}/>

    </ContentLayout>
  </>)
}
Discussions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightDiscussion[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/discussions`
  )
}

export default withUserToken(Discussions)