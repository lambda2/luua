import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import routes from '../../../../../routes/manage'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withUserToken } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import Discussion from '../../../../../components/Discussion/Discussion'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import MissionHeader from '../../../../../components/MissionHeader/MissionHeader'
import { useLocale } from '../../../../../hooks/useLocale'
import DiscussionLeftMenu from '../../../../../layouts/DiscussionLeftMenu/DiscussionLeftMenu'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'

const { manage } = routes


/**
 * Show the requested workspace mission
 */
const ShowDiscussion = (
  { initialData, token }:
    { initialData: Discussion, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

  const { status, data, error } = useCollection<Discussion>(
    `/api/discussions/${query.id}`, token, {}, { initialData }
  )

  const messagesResponse = useCollection<Message[]>(
    data?.id && `/api/discussions/${data?.id}/messages`, token, {}, {}
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussion'
      />}
      <ContentLayout>
        <NetworkBoundary {...messagesResponse}>
          <Discussion discussion={data as Discussion} messages={messagesResponse?.data || []} />
        </NetworkBoundary>
      </ContentLayout>
    </NetworkBoundary>
  )
}

ShowDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Discussion>(ctx, `/api/discussions/${ctx.query.id}`)
}

export default withUserToken(ShowDiscussion)