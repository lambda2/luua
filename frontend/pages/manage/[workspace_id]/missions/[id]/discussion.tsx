import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

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


/**
 * Show the mission main discussion
 */
const MissionDiscussion = (
  { initialData, token }:
    { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  const discussion = ((data?.discussions?.length || 0) > 0) && data?.discussions[0] || undefined

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={data as Mission}
        active='chat'
      />}
      <ContentLayout sideMenu={<DiscussionLeftMenu discussions={data?.discussions} />}>
        <Discussion
          discussion={discussion}
          messagesEndpoint={discussion?.id && `/api/discussions/${discussion?.id}/messages`}
          page={`${query.page}`}
          token={token}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

MissionDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withUserToken(MissionDiscussion)