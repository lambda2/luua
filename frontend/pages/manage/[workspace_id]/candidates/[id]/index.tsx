import React, { useContext } from 'react'
import api, { getHeaders, useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync } from '../../../../../utils/auth'
import { useRouter } from 'next/router'
import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import routes from '../../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import MissionUserShow from '../../../../../components/MissionUserShow/MissionUserShow'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'
import { useLocale } from '../../../../../hooks/useLocale'
import MissionLeftMenu from '../../../../../layouts/MissionLeftMenu/MissionLeftMenu'
import MissionHeader from '../../../../../components/MissionHeader/MissionHeader'
const { manage } = routes
const { workspace } = manage

/**
 * Show the current mission status for a user
 */
const Candidate = (
  { initialData, token }:
  { initialData: MissionUser, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

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