import React from 'react'
import { withUserToken } from 'utils/auth'
import { useCollection, fetchInitialData } from 'utils/http'
import { useRouter } from 'next/router'
import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import WorkspaceShow from 'components/WorkspaceShow/WorkspaceShow'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'
import WorkspaceLeftMenu from 'layouts/WorkspaceLeftMenu/WorkspaceLeftMenu'
import Head from 'components/Head/Head'
import { useLocale } from 'hooks/useLocale'

/**
 * Show the requested workspace, as a member of it
 */
const ShowWorkspace = (
  { initialData, token }:
    { initialData: Workspace, token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const workspaceResponse = useCollection<Workspace>(
    `/api/workspaces/${query.workspace_id}`, token, {}, { initialData }
  )
  const missionsResponse = useCollection<LightMission[]>(
    `/api/workspaces/${query.workspace_id}/missions`, token, {}, {}
  )

  const discussionsResponse = useCollection<LightDiscussion[]>(
    `/api/workspaces/${query.workspace_id}/discussions?per_page=5`, token, {}, {}
  )

  return (
    <>
      <Head
        title={t('meta.head.pages.workspaces.show.title', { name: initialData.name })}
      />
      <NetworkBoundary {...workspaceResponse}>
        <WorkspaceHeader
          workspace={workspaceResponse!.data as Workspace}
          active='summary'
        />
        <ContentLayout sideMenu={<WorkspaceLeftMenu workspace={workspaceResponse!.data as Workspace}/>}>
          <NetworkBoundary {...missionsResponse}>
            <WorkspaceShow
              missions={missionsResponse!.data as LightMission[]}
              discussions={discussionsResponse!.data as LightDiscussion[]}
              workspace={workspaceResponse!.data as Workspace}
            />
          </NetworkBoundary>
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}




ShowWorkspace.getInitialProps = async(ctx: NextPageContext) => {
  return await fetchInitialData<Workspace>(ctx, `/api/workspaces/${ctx.query.workspace_id}`)
}

export default withUserToken(ShowWorkspace)