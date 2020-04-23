import React from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from '../../../utils/http'
import { withAuthSync } from '../../../utils/auth'

import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../layouts/ManageLeftMenu/ManageLeftMenu'

import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceForm from '../../../components/WorkspaceForm/WorkspaceForm';
import WorkspaceHeader from '../../../components/WorkspaceHeader/WorkspaceHeader'


/**
 * Edit a workspace
 */
const Workspace = (
  { initialData, token }:
  { initialData: Workspace, token?: string }
) => {
  const { query } = useRouter()

  const { status, data, error } = useCollection<Workspace>(
    `/api/workspaces/${query.workspace_id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        {data && <div>
          <WorkspaceHeader workspace={data} back actions={[]}/>
          <WorkspaceForm workspace={data} />
        </div>}
      </ContentLayout>
    </NetworkBoundary>
  )
}

Workspace.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Workspace>(ctx, `/api/workspaces/${ctx.query.workspace_id}`)
}

export default withAuthSync(Workspace)