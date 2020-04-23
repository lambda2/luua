import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import routes from '../../../../../routes/manage'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'

import ManageLeftMenu from '../../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'

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

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        <Link {...workspace.missions.edit(`${query.workspace_id}`, `${query.id}`)}>
          <a>Edit</a>
        </Link>
        {data && <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>}
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withAuthSync(Mission)