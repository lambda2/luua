import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'
import { useLocale } from 'hooks/useLocale';

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { useRouter } from 'next/router';
import routes, { ROUTES } from 'routes/routes'
import Link from 'next/link'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from 'contexts/WorkspaceContext';
import PageTitle from 'elements/PageTitle/PageTitle';
import can from 'utils/can';
import UserContext from 'contexts/UserContext';
import DiscussionList from 'components/DiscussionList/DiscussionList';
import { Menu, Dropdown, Button } from 'antd';
import icons from 'dictionaries/icons';
import DiscussionsLeftMenu from 'layouts/DiscussionsLeftMenu/DiscussionsLeftMenu';
import { Head } from 'components/Head/Head';
import { vote } from 'api/message';
import usePaginatedCollection from 'hooks/usePaginatedCollection';
import Paginated from 'components/Paginated/Paginated';
const { manage } = routes

/**
 * The discussions list of a workspace
 */
const Discussions = (
  { initialData, token }:
  { initialData: LightDiscussion[], token?: string }
) => {
  const { pathname, query } = useRouter()

  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  // const response = useCollection<LightDiscussion[]>(
  //   `/api/workspaces/${query.workspace_id}/discussions`, token, {}, { initialData }
  // )

  const initialPage = query.page ? parseInt(`${query.page}`) : 1
  const queryKey = `discussions`

  const {
    resolvedData,
    latestData,
    refetch,
    page,
    nextPage,
    prevPage,
    lastPage,
    setPage,
  } = usePaginatedCollection<LightDiscussion>({
    initialPage,
    token,
    endpoint: `/api/workspaces/${query.workspace_id}/discussions`,
    queryKey,
    queryParams: { workspace_id: query.workspace_id },
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
  
  const menu = (
    <Menu>
      {can(currentUser, 'discussion.create', currentWorkspace) && <Menu.Item key="create-discussion">
        <Link {...manage.workspace.discussions.new(`${query.workspace_id}`)}>
          <a>{t('discussion.create.title')}</a>
        </Link>
      </Menu.Item>}
    </Menu>
  );

  const wname = initialData && initialData[0]?.workspace?.name

  return (<>
    <Head
      title={t('meta.head.pages.discussions.index.title', { workspace: { name: wname } })}
    />
    {/* <NetworkBoundary<LightDiscussion[]> {...resolvedData}> */}
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussions'
      />}
      <ContentLayout sideMenu={currentWorkspace && <DiscussionsLeftMenu workspace={currentWorkspace} />}>
{/*         
        <DiscussionList
          readings={discussionsReadingsResponse.data}
          data={response.data as LightDiscussion[]}
          userVotes={votesResponse?.data}
          onVote={voteMessage}
        /> */}


        <Paginated<LightDiscussion[]>
          data={resolvedData}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          prev={() => setPage(old => Math.max(old - 1, 0))}
          next={() => setPage(old => (!latestData || !nextPage ? old : old + 1))}
          last={() => setPage(old => (!latestData || !nextPage ? old : lastPage || old))}
          first={() => setPage(1)}
          page={page && parseInt(page.toString()) || undefined}
          renderList={(discussions) => <DiscussionList
            readings={discussionsReadingsResponse.data}
            data={discussions}
            userVotes={votesResponse?.data}
            onVote={voteMessage}
          />}
        />
      </ContentLayout>
    {/* </NetworkBoundary> */}
  </>)
}
Discussions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightDiscussion[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/discussions`
  )
}

export default withUserToken(Discussions)