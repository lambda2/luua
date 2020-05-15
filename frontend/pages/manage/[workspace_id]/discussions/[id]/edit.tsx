import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync, withUserToken } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'
import MissionForm from '../../../../../components/MissionForm/MissionForm';

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'
import DiscussionForm from '../../../../../components/DiscussionForm/DiscussionForm'
import discussion from '../../missions/[id]/discussion'

/**
 * Edit the requested discussion
 */
const EditDiscussion = (
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
        <DiscussionForm discussion={data}/>
      </ContentLayout>
    </NetworkBoundary>
  )
}

EditDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Discussion>(ctx, `/api/discussions/${ctx.query.id}`)
}

export default withUserToken(EditDiscussion)