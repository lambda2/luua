import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'
import { useRouter } from 'next/router'
import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import MissionUserShow from 'components/MissionUserShow/MissionUserShow'
import WorkspaceContext from 'contexts/WorkspaceContext'
import MissionLeftMenu from 'layouts/MissionLeftMenu/MissionLeftMenu'
import MissionHeader from 'components/MissionHeader/MissionHeader'

/**
 * Show the current mission status for a user
 */
const Candidate = (
  { initialData, token }:
  { initialData: MissionUser, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)

  const response = useCollection<MissionUser>(
    `/api/mission_users/${query.id}`, token, {}, { initialData }
  )
  
  return (
    <NetworkBoundary {...response}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={response!.data?.mission as LightMission}
        active='summary'
      />}

      <ContentLayout sideMenu={<MissionLeftMenu mission={response!.data?.mission as LightMission} />}>
        <MissionUserShow refetch={response.refetch} mission_user={response!.data as MissionUser} />
      </ContentLayout>
    </NetworkBoundary>
  )
}

Candidate.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<MissionUser>(ctx, `/api/mission_users/${ctx.query.id}`)
}

export default withAuthSync(Candidate)