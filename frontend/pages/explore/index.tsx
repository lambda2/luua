import React from 'react'
import { useCollection, fetchInitialData } from 'utils/http'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next';
import { useLocale } from 'hooks/useLocale';
import ContentLayout from 'layouts/ContentLayout/ContentLayout';
import ExploreHeader from 'components/ExploreHeader/ExploreHeader';
import Grid from 'elements/Grid/Grid';
import WorkspaceGridItem from 'components/WorkspaceGridItem/WorkspaceGridItem';
import Title from 'elements/Title/Title';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import List from 'elements/List/List';

interface Props {
  initialData: LightWorkspace[],
  token?: string
}

const ExploreHome = (
  { initialData, token }: Props
) => {
  const workspacesResponse = useCollection<LightWorkspace[]>(
    `/api/workspaces?open_membership=true`, token, {}, { initialData }
  )
  const discussionsResponse = useCollection<LightDiscussion[]>(
    `/api/discussions?per_page=10&unread=true`, token, {}, {}
  )
  
  const { t } = useLocale()

  return (
    <>
      <ExploreHeader
        active='discover'
      />
      <NetworkBoundary<LightWorkspace[]> {...workspacesResponse}>
        <ContentLayout>
          <Title level={'4'}>{t('homepage.popular-spaces')}</Title>
          <Grid
            dataSource={workspacesResponse.data}
            itemWidth="400px"
            emptyText={t('workspace.empty')}
            renderItem={(e) => <WorkspaceGridItem {...e} />}
          />
          <br />
          <Title level={'4'}>{t('homepage.popular-discussions')}</Title>
          <List
            dataSource={discussionsResponse.data}
            emptyText={t('discussion.empty')}
            renderItem={(e) => <DiscussionItem discussion={e} />}
          />
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}

ExploreHome.getInitialProps = async (ctx: NextPageContext) => {
  const data = await fetchInitialData<LightWorkspace[]>(ctx, '/api/workspaces?for_user=true')
  return data
}

export default ExploreHome
