import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import MissionForm from 'components/MissionForm/MissionForm';

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'
import MissionHeader from 'components/MissionHeader/MissionHeader'
import { onDestroy } from 'utils/mission'
import UserContext from 'contexts/UserContext'

/**
 * Edit a mission
 */
const Mission = (
  { initialData, token }:
  { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={data as Mission}
        onDestroy={(m) => onDestroy(m, token || currentUser?.jwt || '')}
        active='settings'
      />}
      <ContentLayout>
      {data && <div>
        <MissionForm mission={data} />
      </div>}
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withAuthSync(Mission)