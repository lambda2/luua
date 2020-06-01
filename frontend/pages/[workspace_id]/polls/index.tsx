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
import PollList from 'components/PollList/PollList';
import { Menu, Dropdown, Button } from 'antd';
import icons from 'dictionaries/icons';
const { manage } = routes

/**
 * The polls list of a workspace
 */
const Polls = (
  { initialData, token }:
  { initialData: LightPoll[], token?: string }
) => {
  const { pathname, query } = useRouter()

  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  const response = useCollection<LightPoll[]>(
    `/api/workspaces/${query.workspace_id}/polls`, token, {}, { initialData }
  )

  const menu = (
    <Menu>
      {can(currentUser, 'poll.create', currentWorkspace) && <Menu.Item key="create-poll">
        <Link {...manage.workspace.polls.new(`${query.workspace_id}`)}>
          <a>{t('poll.create.title')}</a>
        </Link>
      </Menu.Item>}
    </Menu>
  );

  return (
    <NetworkBoundary<LightPoll[]> {...response}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='votes'
      />}
      <ContentLayout>
        <PageTitle level='2' title={t('menu.polls')}>
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.plussquare}</span>
            </Button>
          </Dropdown>
        </PageTitle>
        
        <PollList data={response.data as LightPoll[]} />
      </ContentLayout>
    </NetworkBoundary>
  )
}
Polls.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<LightPoll[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/polls`
  )
}

export default withUserToken(Polls)