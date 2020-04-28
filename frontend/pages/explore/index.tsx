import React from 'react'
import { useCollection, fetchInitialData } from '../../utils/http'

import NetworkBoundary from '../../components/NetworkBoudary/NetworkBoudary'
import MissionList from '../../components/MissionList/MissionList'
import { Typography } from 'antd';
import { NextPageContext } from 'next';
import { useLocale } from '../../hooks/useLocale';
import ContentLayout from '../../layouts/ContentLayout/ContentLayout';
import PageTitle from '../../elements/PageTitle/PageTitle';
const { Title } = Typography;

interface Props {
  initialData: LightMission[],
  token?: string
}

const Explore = (
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
        <PageTitle title={t('explore.title')} />

        <NetworkBoundary<LightMission[]> {...response}>
          <MissionList data={response.data as LightMission[]} />
        </NetworkBoundary>
      </ContentLayout>
    </>
  )
}

Explore.getInitialProps = async (ctx: NextPageContext) => {
  const data = await fetchInitialData<LightMission[]>(ctx, '/api/missions?for_user=true')
  return data
}

export default Explore
