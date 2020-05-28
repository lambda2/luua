import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import routes from 'routes/routes'

import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync, withUserToken } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceMissionDetail from 'components/WorkspaceMissionDetail/WorkspaceMissionDetail'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import MissionHeader from 'components/MissionHeader/MissionHeader'
import MissionLeftMenu from 'layouts/MissionLeftMenu/MissionLeftMenu'
import UserContext from 'contexts/UserContext'
import find from 'lodash/find'

/**
 * Show the requested workspace mission
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

  const onDestroy = (nission: BaseMission) => {

  }

  const application = currentUser && data && find(currentUser?.mission_users, { mission_id: data.id }) || undefined

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={data as Mission}
        onDestroy={onDestroy}
        active='summary'
      />}
      <ContentLayout sideMenu={<MissionLeftMenu application={application} mission={data as Mission} />}>
        <WorkspaceMissionDetail {...data as Mission} />
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withUserToken(Mission)