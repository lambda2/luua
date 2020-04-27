import React, { useContext } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { withUserToken } from '../../../../utils/auth'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import MissionDetail from '../../../../components/MissionDetail/MissionDetail'
import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceContext from '../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader'
import Link from 'next/link'
import ROUTES from '../../../../routes/manage'
import { useLocale } from '../../../../hooks/useLocale'

/**
 * Show a mission and it's details
 */
const Mission = (
  { initialData, token }:
  { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  const workspaceResponse = useCollection<Workspace>(
    `/api/workspaces/${data?.workspace_id}`, token, {}, {}
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      <NetworkBoundary {...workspaceResponse}>
        {workspaceResponse?.data && <WorkspaceHeader
          workspace={workspaceResponse.data}
          tree={[<Link {...ROUTES.explore.workspace.missions.index(workspaceResponse.data.id)}><a>{t('menu.missions')}</a></Link>]}
        />}
        <ContentLayout>
          {data && <MissionDetail {...data} />}
        </ContentLayout>
      </NetworkBoundary>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withUserToken(Mission)