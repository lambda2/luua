import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'
import { useLocale } from '../../../../hooks/useLocale';

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../../components/WorkspaceMissionList/WorkspaceMissionList'
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import routes from '../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from '../../../../contexts/WorkspaceContext';
const { manage } = routes

const { Title } = Typography;

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
    <ContentLayout sideMenu={<ManageLeftMenu />}>

      {currentWorkspace && <WorkspaceHeader workspace={currentWorkspace} />}

      <Link {...manage.workspace.missions.new(`${query.workspace_id}`)}><a>{t('mission.create.title')}</a></Link>

      <NetworkBoundary<LightMission[]> {...response}>
        <MissionList data={response.data as LightMission[]} />
      </NetworkBoundary>
    </ContentLayout>
  )
}
Missions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightMission[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/missions`
  )
}

export default withAuthSync(Missions)