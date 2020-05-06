import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData, usePaginatedCollection } from '../../../../../utils/http'
import { withUserToken } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import Discussion from '../../../../../components/Discussion/Discussion'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import { useLocale } from '../../../../../hooks/useLocale'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'
import PaginatedNetworkBoudary from '../../../../../components/PaginatedNetworkBoudary/PaginatedNetworkBoudary'


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

  const messagesResponse = usePaginatedCollection<Message[]>(
    data?.id && `/api/discussions/${data?.id}/messages`, query.page, token, {}, {}
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussion'
      />}
      <ContentLayout>
        <PaginatedNetworkBoudary {...messagesResponse}>
          <Discussion discussion={data as Discussion} messages={messagesResponse?.resolvedData?.data || []} />
        </PaginatedNetworkBoudary>
      </ContentLayout>
    </NetworkBoundary>
  )
}

ShowDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Discussion>(ctx, `/api/discussions/${ctx.query.id}`)
}

export default withUserToken(ShowDiscussion)