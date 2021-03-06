import { useRouter } from 'next/router';

import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'

import { useLocale } from 'hooks/useLocale';

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import MissionUserList from 'components/MissionUserList/MissionUserList'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import PageTitle from 'elements/PageTitle/PageTitle';
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from 'contexts/WorkspaceContext';
import { useContext } from 'react';

/**
 * Will list all the candidates for our workspace's missions
 */
const Candidates = (
  { initialData, token }:
  { initialData: MissionUser[], token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()
  const { currentWorkspace } = useContext(WorkspaceContext)

  const response = useCollection<MissionUser[]>(
    `/api/workspaces/${query.workspace_id}/mission_users/applied`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary<MissionUser[]> {...response}>
      { currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='candidates'
      />}
      <ContentLayout>
        <PageTitle title={t('menu.candidates')} />
        <MissionUserList data={response.data as MissionUser[]} />
      </ContentLayout>
    </NetworkBoundary>
  )
}
Candidates.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<MissionUser[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/mission_users/applied`
  )
}

export default withAuthSync(Candidates)