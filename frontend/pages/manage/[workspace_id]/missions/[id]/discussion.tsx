import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import routes from '../../../../../routes/manage'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync, withUserToken } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import MissionDiscussion from '../../../../../components/MissionDiscussion/MissionDiscussion'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import MissionHeader from '../../../../../components/MissionHeader/MissionHeader'
import { useLocale } from '../../../../../hooks/useLocale'
import DiscussionLeftMenu from '../../../../../layouts/DiscussionLeftMenu/DiscussionLeftMenu'

const { manage } = routes
const { workspace } = manage


/**
 * Show the requested workspace mission
 */
const Mission = (
  { initialData, token }:
    { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  const discussionId = (data?.discussions?.length) && data?.discussions[0].id

  const discussionResponse = useCollection<Discussion>(
    discussionId && `/api/discussions/${discussionId}`, token, {}, {}
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={data as Mission}
        active='chat'
      />}
      <ContentLayout sideMenu={<DiscussionLeftMenu discussions={data?.discussions} />}>
        <NetworkBoundary {...discussionResponse}>
          <MissionDiscussion discussion={discussionResponse.data} mission={data as Mission} />
        </NetworkBoundary>
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withUserToken(Mission)