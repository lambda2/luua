import React from 'react'
import { useCollection, fetchInitialData } from 'utils/http'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import WorkspaceList from 'components/WorkspaceList/WorkspaceList'
import { NextPageContext } from 'next';
import { useLocale } from 'hooks/useLocale';
import ContentLayout from 'layouts/ContentLayout/ContentLayout';
import ExploreHeader from 'components/ExploreHeader/ExploreHeader';

interface Props {
  initialData: LightWorkspace[],
  token?: string
}

const ExploreWorkspaces = (
  { initialData, token }: Props
) => {
  const response = useCollection<LightWorkspace[]>(
    `/api/workspaces?for_user=true`, token, {}, { initialData }
  )

  return (
    <>
      <ExploreHeader
        active='workspaces'
      />
      <NetworkBoundary<LightWorkspace[]> {...response}>
        <ContentLayout>
          <WorkspaceList data={response.data as LightWorkspace[]} />
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}

ExploreWorkspaces.getInitialProps = async (ctx: NextPageContext) => {
  const data = await fetchInitialData<LightWorkspace[]>(ctx, '/api/workspaces?for_user=true')
  return data
}

export default ExploreWorkspaces
