import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from 'utils/http'
import { withUserToken } from 'utils/auth'
import { useLocale } from 'hooks/useLocale';

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { useRouter } from 'next/router';
import routes, { ROUTES } from 'routes/routes'
import Link from 'next/link'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from 'contexts/WorkspaceContext';
import PageTitle from 'elements/PageTitle/PageTitle';
import can from 'utils/can';
import UserContext from 'contexts/UserContext';
import DiscussionList from 'components/DiscussionList/DiscussionList';
import { Menu, Dropdown, Button } from 'antd';
import icons from 'dictionaries/icons';
import DiscussionsLeftMenu from 'layouts/DiscussionsLeftMenu/DiscussionsLeftMenu';
const { manage } = routes

/**
 * The discussions list of a workspace
 */
const Discussions = (
  { initialData, token }:
  { initialData: LightDiscussion[], token?: string }
) => {
  const { pathname, query } = useRouter()

  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  const response = useCollection<LightDiscussion[]>(
    `/api/workspaces/${query.workspace_id}/discussions`, token, {}, { initialData }
  )

  const discussionsReadingsResponse = useCollection<DiscussionReading[]>(
    `/api/workspaces/${query.workspace_id}/discussion_readings/mines`, token, {}, {}
  )

  const menu = (
    <Menu>
      {can(currentUser, 'discussion.create', currentWorkspace) && <Menu.Item key="create-discussion">
        <Link {...manage.workspace.discussions.new(`${query.workspace_id}`)}>
          <a>{t('discussion.create.title')}</a>
        </Link>
      </Menu.Item>}
    </Menu>
  );

  return (
    <NetworkBoundary<LightDiscussion[]> {...response}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussions'
      />}
      <ContentLayout sideMenu={currentWorkspace && <DiscussionsLeftMenu workspace={currentWorkspace} />}>
        <PageTitle level='2' title={t('menu.discussions')}>
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.plussquare}</span>
            </Button>
          </Dropdown>
        </PageTitle>
        
        <DiscussionList
          readings={discussionsReadingsResponse.data}
          data={response.data as LightDiscussion[]}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}
Discussions.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightDiscussion[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/discussions`
  )
}

export default withUserToken(Discussions)