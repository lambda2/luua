import React from 'react'
import { withUserToken } from '../../../utils/auth'
import { useCollection, fetchInitialData } from '../../../utils/http'
import { useRouter } from 'next/router'
import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import WorkspaceShow from '../../../components/WorkspaceShow/WorkspaceShow'
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from '../../../components/WorkspaceHeader/WorkspaceHeader'
import WorkspaceLeftMenu from '../../../layouts/WorkspaceLeftMenu/WorkspaceLeftMenu'

/**
 * Show the requested workspace, as a member of it
 */
const ShowWorkspace = (
  { initialData, token }:
    { initialData: Workspace, token?: string }
) => {
  const { query } = useRouter()
  const workspaceResponse = useCollection<Workspace>(
    `/api/workspaces/${query.workspace_id}`, token, {}, { initialData }
  )
  const missionsResponse = useCollection<LightMission[]>(
    `/api/workspaces/${query.workspace_id}/missions`, token, {}, {}
  )

  return (
    <NetworkBoundary {...workspaceResponse}>
      <WorkspaceHeader
        workspace={workspaceResponse!.data as Workspace}
        active='summary'
      />
      <ContentLayout sideMenu={<WorkspaceLeftMenu workspace={workspaceResponse!.data as Workspace}/>}>
        <NetworkBoundary {...missionsResponse}>
          <WorkspaceShow
            missions={missionsResponse!.data as LightMission[]}
            workspace={workspaceResponse!.data as Workspace}
          />
        </NetworkBoundary>
      </ContentLayout>
    </NetworkBoundary>
  )
}




ShowWorkspace.getInitialProps = async(ctx: NextPageContext) => {
  return await fetchInitialData<Workspace>(ctx, `/api/workspaces/${ctx.query.workspace_id}`)
}

export default withUserToken(ShowWorkspace)