import { useRouter } from 'next/router';

import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'

import { useLocale } from '../../../../hooks/useLocale';

import routes from '../../../../routes/manage'
import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionUserList from '../../../../components/MissionUserList/MissionList'

import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../../../elements/PageTitle/PageTitle';
import { useContext } from 'react';
import WorkspaceContext from '../../../../contexts/WorkspaceContext';
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader';
import Link from 'next/link';
const { manage } = routes
const { workspace } = manage

/**
 * Will list all the contributors for our workspace's missions
 */
const Candidates = (
  { initialData, token }:
  { initialData: MissionUser[], token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

  const response = useCollection<MissionUser[]>(
    `/api/workspaces/${query.workspace_id}/mission_users/contributors`, token, {}, { initialData }
  )

  return (
      <NetworkBoundary<MissionUser[]> {...response}>
        {currentWorkspace && <WorkspaceHeader
          workspace={currentWorkspace}
          active='contributors'
        />}
        <ContentLayout sideMenu={<ManageLeftMenu />}>
          <PageTitle title={t('menu.contributors')} />
          <MissionUserList data={response.data as MissionUser[]} />
        </ContentLayout>
      </NetworkBoundary>
  )
}
Candidates.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<MissionUser[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/mission_users/contributors`
  )
}

export default withAuthSync(Candidates)