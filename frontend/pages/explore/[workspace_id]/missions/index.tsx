import React from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withUserToken } from '../../../../utils/auth'

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../../components/MissionList/MissionList'
import { Typography } from 'antd';
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ROUTES from '../../../../routes/manage'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { Title } = Typography;

const Missions = (
  { initialData, token }:
  { initialData: LightMission[], token?: string }
) => {

  const { query } = useRouter()
  const { status, data, error } = useCollection<LightMission[]>(
    `/api/workspaces/${query.workspace_id}/missions`, token, {}, { initialData }
  )
  
  return (
    <>
      <NetworkBoundary<LightMission[]> status={status} data={data} error={error}>
        {data?.length && data[0].workspace && <WorkspaceHeader
          workspace={data[0].workspace as Workspace} // @TODO bad bad bad
        />}
        <ContentLayout>
          <MissionList data={data as LightMission[]} />
        </ContentLayout>

      </NetworkBoundary>
    </>
  )
}
Missions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightMission[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/missions`
  )
}

export default withUserToken(Missions)