import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import Poll from 'components/Poll/Poll'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'

/**
 * Show the requested poll
 */
const ShowPoll = (
  { initialData, token }:
  { initialData: Poll, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { status, data, error } = useCollection<Poll>(
    `/api/polls/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='votes'
      />}
      <ContentLayout>
        {/* Paginated poll @TODO */}
        <Poll
          poll={data as Poll}
          messagesEndpoint={data?.id && `/api/polls/${data?.id}/messages`}
          votesEndpoint={data?.id && `/api/polls/${data?.id}/message_votes/mines`}
          page={`${query.page}`}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

ShowPoll.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Poll>(ctx, `/api/polls/${ctx.query.id}`)
}

export default withUserToken(ShowPoll)