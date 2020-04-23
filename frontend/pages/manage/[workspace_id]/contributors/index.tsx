import { useRouter } from 'next/router';

import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'

import { useLocale } from '../../../../hooks/useLocale';

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import MissionUserList from '../../../../components/MissionUserList/MissionList'

import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../../../elements/PageTitle/PageTitle';

/**
 * Will list all the contributors for our workspace's missions
 */
const Candidates = (
  { initialData, token }:
  { initialData: MissionUser[], token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const response = useCollection<MissionUser[]>(
    `/api/workspaces/${query.workspace_id}/mission_users/contributors`, token, {}, { initialData }
  )

  return (
    <ContentLayout sideMenu={<ManageLeftMenu />}>
      <PageTitle title={t('menu.contributors')} />
      <NetworkBoundary<MissionUser[]> {...response}>
        <MissionUserList data={response.data as MissionUser[]} />
      </NetworkBoundary>
    </ContentLayout>
  )
}
Candidates.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<MissionUser[]>(
    ctx, `/api/workspaces/${ctx.query.workspace_id}/mission_users/contributors`
  )
}

export default withAuthSync(Candidates)