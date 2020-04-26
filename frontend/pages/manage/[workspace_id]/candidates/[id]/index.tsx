import React from 'react'
import api, { getHeaders, useCollection, fetchInitialData } from '../../../../../utils/http'
import { withAuthSync } from '../../../../../utils/auth'
import { useRouter } from 'next/router'
import NetworkBoundary from '../../../../../components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import routes from '../../../../../routes/manage'
import Link from 'next/link'
import ManageLeftMenu from '../../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import ContentLayout from '../../../../../layouts/ContentLayout/ContentLayout'
import MissionUserShow from '../../../../../components/MissionUserShow/MissionUserShow'
const { manage } = routes
const { workspace } = manage

const MissionUser = (
  { initialData, token }:
  { initialData: MissionUser, token?: string }
) => {
  const { query } = useRouter()
  const response = useCollection<MissionUser>(
    `/api/mission_users/${query.id}`, token, {}, { initialData }
  )

  
  return (
    <NetworkBoundary {...response}>
      <ContentLayout sideMenu={<ManageLeftMenu />}>
        <MissionUserShow refetch={response.refetch} mission_user={response!.data as MissionUser} />
      </ContentLayout>
    </NetworkBoundary>
  )
}

MissionUser.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<MissionUser>(ctx, `/api/mission_users/${ctx.query.id}`)
}

export default withAuthSync(MissionUser)