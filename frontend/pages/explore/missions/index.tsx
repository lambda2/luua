import React from 'react'
import { useCollection, fetchInitialData } from '../../../utils/http'

import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../../components/MissionList/MissionList'
import { Typography } from 'antd';
import { NextPageContext } from 'next';
import { useLocale } from '../../../hooks/useLocale';
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout';
import PageTitle from '../../../elements/PageTitle/PageTitle';
import ExploreHeader from '../../../components/ExploreHeader/ExploreHeader';
const { Title } = Typography;

interface Props {
  initialData: LightMission[],
  token?: string
}

const ExploreMissions = (
  { initialData, token }: Props
) => {

  const { t } = useLocale()

  console.log({ initialData, token });
  
  const response = useCollection<LightMission[]>(
    `/api/missions?for_user=true`, token, {}, { initialData }
  )
  
  return (
    <>
      <ContentLayout>
        <ExploreHeader
          active='missions'
        />

        <NetworkBoundary<LightMission[]> {...response}>
          <MissionList data={response.data as LightMission[]} />
        </NetworkBoundary>
      </ContentLayout>
    </>
  )
}

ExploreMissions.getInitialProps = async (ctx: NextPageContext) => {
  const data = await fetchInitialData<LightMission[]>(ctx, '/api/missions?for_user=true')
  return data
}

export default ExploreMissions
