import React from 'react'
import { useCollection, fetchInitialData } from '../../../utils/http'
import { withUserToken } from '../../../utils/auth'

import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../components/MissionList/MissionList'
import { Typography } from 'antd';
import Link from 'next/link'

const { Title } = Typography;

const Missions = (
  { initialData, token }:
  { initialData: LightMission[], token?: string }
) => {

  const response = useCollection<LightMission[]>(
    `/api/missions`, token, {}, { initialData }
  )
  
  return (
    <>
      <Title>Missions</Title>

      <Link href={'/missions/new'}><a>Scaffold a mission</a></Link>

      <NetworkBoundary<LightMission[]> {...response}>
        <MissionList data={response.data as LightMission[]} />
      </NetworkBoundary>
    </>
  )
}
Missions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightMission[]>(ctx, '/api/missions')
}

export default withUserToken(Missions)