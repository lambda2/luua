import React, { useContext } from 'react'
import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withUserToken } from '../../../../utils/auth'
import { useLocale } from '../../../../hooks/useLocale';

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import { useRouter } from 'next/router';
import routes from '../../../../routes/manage'
import Link from 'next/link'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from '../../../../contexts/WorkspaceContext';
import PageTitle from '../../../../elements/PageTitle/PageTitle';
import can from '../../../../utils/can';
import UserContext from '../../../../contexts/UserContext';
import DiscussionList from '../../../../components/DiscussionList/DiscussionList';
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
  
  return (
    <NetworkBoundary<LightDiscussion[]> {...response}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='discussions'
      />}
      <ContentLayout>
        <PageTitle level='2' title={t('menu.discussions')}>
          {can(currentUser, 'discussion.create', currentWorkspace) && <Link {...manage.workspace.discussions.new(`${query.workspace_id}`)}>
            <a>{t('discussion.create.title')}</a>
          </Link>}
        </PageTitle>
        
        <DiscussionList data={response.data as LightDiscussion[]} />
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