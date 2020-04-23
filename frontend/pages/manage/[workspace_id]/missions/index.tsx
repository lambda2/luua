import React from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../../components/WorkspaceMissionList/WorkspaceMissionList'
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import routes from '../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
const { manage } = routes

const { Title } = Typography;

const Missions = (
  { initialData, token }:
  { initialData: LightMission[], token?: string }
) => {
  const { pathname, query } = useRouter()

  const response = useCollection<LightMission[]>(
    `/api/workspaces/${query.workspace_id}/missions`, token, {}, { initialData }
  )
  
  return (
    <ContentLayout sideMenu={<ManageLeftMenu />}>

      <Title>Missions</Title>

      <Link {...manage.workspace.missions.new(`${query.workspace_id}`)}><a>Scaffold a mission</a></Link>

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