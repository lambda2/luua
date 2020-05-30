import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import Discussion from 'components/Discussion/Discussion'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'
import { Head } from 'components/Head/Head'
import { useLocale } from 'hooks/useLocale'

/**
 * Show the requested discussion
 */
const ShowDiscussion = (
  { initialData, token }:
    { initialData: Discussion, token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { status, data, error } = useCollection<Discussion>(
    `/api/discussions/${query.id}`, token, {}, { initialData }
  )

  return (<>
    <Head
      title={t('meta.head.pages.discussions.show.title', initialData)}
    />
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
          votesEndpoint={data?.id && `/api/discussions/${data?.id}/message_votes/mines`}
          initialPage={query.page && parseInt(query.page as string) || undefined}
          token={token}
        />
      </ContentLayout>
    </NetworkBoundary>
  </>)
}

ShowDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Discussion>(ctx, `/api/discussions/${ctx.query.id}`)
}

export default withUserToken(ShowDiscussion)