import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'
import { useLocale } from '../../../../hooks/useLocale';

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../../components/WorkspaceMissionList/WorkspaceMissionList'
import { useRouter } from 'next/router';
import routes from '../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from '../../../../contexts/WorkspaceContext';
import PageTitle from '../../../../elements/PageTitle/PageTitle';
const { manage } = routes

/**
 * The missions list of a workspace
 */
const Missions = (
  { initialData, token }:
  { initialData: LightMission[], token?: string }
) => {
  const { pathname, query } = useRouter()

  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)

  const response = useCollection<LightMission[]>(
    `/api/workspaces/${query.workspace_id}/missions`, token, {}, { initialData }
  )
  
  return (
    <NetworkBoundary<LightMission[]> {...response}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='missions'
      />}
      <ContentLayout>
        <PageTitle title={t('menu.missions')} />
        <Link {...manage.workspace.missions.new(`${query.workspace_id}`)}><a>{t('mission.create.title')}</a></Link>
        <MissionList data={response.data as LightMission[]} />
      </ContentLayout>
    </NetworkBoundary>
  )
}
Missions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightMission[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/missions`
  )
}

export default withAuthSync(Missions)