import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withUserToken } from '../../../../utils/auth'
import { useLocale } from '../../../../hooks/useLocale';

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../../components/MissionList/MissionList'
import { useRouter } from 'next/router';
import routes from '../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from '../../../../contexts/WorkspaceContext';
import PageTitle from '../../../../elements/PageTitle/PageTitle';
import can from '../../../../utils/can';
import UserContext from '../../../../contexts/UserContext';
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
  const { currentUser } = useContext(UserContext)

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
        <PageTitle level='2' title={t('menu.missions')}>
          {can(currentUser, 'mission.create', currentWorkspace) && <Link {...manage.workspace.missions.new(`${query.workspace_id}`)}>
            <a>{t('mission.create.title')}</a>
          </Link>}
        </PageTitle>
        
        <MissionList activeWorkspace={currentWorkspace?.id} data={response.data as LightMission[]} />
      </ContentLayout>
    </NetworkBoundary>
  )
}
Missions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightMission[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/missions`
  )
}

export default withUserToken(Missions)