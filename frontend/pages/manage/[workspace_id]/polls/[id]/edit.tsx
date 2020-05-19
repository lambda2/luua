import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'
import PollForm from 'components/PollForm/PollForm'

/**
 * Edit the requested poll
 */
const EditPoll = (
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
        <PollForm poll={data}/>
      </ContentLayout>
    </NetworkBoundary>
  )
}

EditPoll.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Poll>(ctx, `/api/polls/${ctx.query.id}`)
}

export default withUserToken(EditPoll)