import React from 'react'
import { withAuthSync } from '../../../utils/auth'
import { useCollection, fetchInitialData } from '../../../utils/http'
import { useRouter } from 'next/router'
import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import WorkspaceShow from '../../../components/WorkspaceShow/WorkspaceShow'
import { Layout } from 'antd'
const { Content } = Layout;
import ManageLeftMenu from '../../../layouts/ManageLeftMenu/ManageLeftMenu'
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from '../../../components/WorkspaceHeader/WorkspaceHeader'


const ShowWorkspace = (
  { initialData, token }:
  { initialData: Workspace, token?: string }
) => {
  const { query } = useRouter()
  const response= useCollection<Workspace>(
    `/api/workspaces/${query.workspace_id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary {...response}>
      <WorkspaceHeader
        workspace={response!.data as Workspace}
        active='summary'
      />
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        <WorkspaceShow workspace={response!.data as Workspace} />
      </ContentLayout>
    </NetworkBoundary>
  )

}


ShowWorkspace.getInitialProps = async(ctx: NextPageContext) => {
  return await fetchInitialData<Workspace>(ctx, `/api/workspaces/${ctx.query.workspace_id}`)
}

export default withAuthSync(ShowWorkspace)