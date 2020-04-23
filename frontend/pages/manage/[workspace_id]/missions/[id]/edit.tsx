import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

import { useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync } from '../../../../../utils/auth'

import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'
import MissionForm from '../../../../../components/MissionForm/MissionForm';

import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../../layouts/ManageLeftMenu/ManageLeftMenu'

/**
 * Edit a mission
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
      {data && <div>
        <MissionForm mission={data} />
      </div>}
      </ContentLayout>
    </NetworkBoundary>
  )
}

Mission.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withAuthSync(Mission)