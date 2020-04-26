import React from 'react'
import { useCollection, fetchInitialData } from '../../../utils/http'
import { withAuthSync } from '../../../utils/auth'
import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceList from '../../../components/WorkspaceList/WorkspaceList'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'antd'
import LeftMenu from '../../../layouts/LeftMenu/LeftMenu'
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../layouts/ManageLeftMenu/ManageLeftMenu'

const Workspaces = (
  { initialData, token }:
  { initialData: LightWorkspace[], token?: string }
) => {
  
  const response = useCollection<LightWorkspace[]>(
    `/api/workspaces`, token, {}, { initialData }
  )

  return (
    <>
      <NetworkBoundary<LightWorkspace[]> {...response}>
        <ContentLayout sideMenu={<ManageLeftMenu />}>
          <h1>Spaces</h1>
          <Link href={`/workspaces/new`} as={`/workspaces/new`}><a>Create a workspace</a></Link>

          <WorkspaceList data={response.data as LightWorkspace[]} />
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}

Workspaces.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<LightWorkspace[]>(ctx, '/api/workspaces')
}

export default withAuthSync(Workspaces)