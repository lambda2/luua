import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import routes from '../../../../../routes/manage'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ManageLeftMenu from '../../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import WorkspaceMissionDetail from '../../../../../components/WorkspaceMissionDetail/WorkspaceMissionDetail'
import { useContext } from 'react'
import WorkspaceContext from '../../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../../components/WorkspaceHeader/WorkspaceHeader'
import PageTitle from '../../../../../elements/PageTitle/PageTitle'
import { useLocale } from '../../../../../hooks/useLocale'

const { manage } = routes
const { workspace } = manage


/**
 * Show workspace missions
 */
const Mission = (
  { initialData, token }:
  { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        tree={[<Link {...workspace.missions.index(currentWorkspace.id)}><a>{t('menu.missions')}</a></Link>]}
      />}
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        <WorkspaceMissionDetail {...data as Mission} />
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withAuthSync(Mission)