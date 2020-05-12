import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withUserToken } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import Discussion from '../../../../../components/Discussion/Discussion'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'

/**
 * Show the requested discussion
 */
const ShowDiscussion = (
  { initialData, token }:
    { initialData: Discussion, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { status, data, error } = useCollection<Discussion>(
    `/api/discussions/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussions'
      />}
      <ContentLayout>
        {/* Paginated discussion @TODO */}
        <Discussion
          discussion={data as Discussion}
          messagesEndpoint={data?.id && `/api/discussions/${data?.id}/messages`}
          page={`${query.page}`}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

ShowDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Discussion>(ctx, `/api/discussions/${ctx.query.id}`)
}

export default withUserToken(ShowDiscussion)