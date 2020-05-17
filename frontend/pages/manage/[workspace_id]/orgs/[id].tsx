import React from 'react'
import { withAuthSync } from 'utils/auth'
import { fetchInitialData, useCollection } from 'utils/http'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'


const ShowOrg = (
  { initialData, token }:
  { initialData: Organization, token?: string }
) => {  const { query } = useRouter()
  const { status, data, error } = useCollection<Organization>(
    `/api/organizations/${query.id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <style jsx>{`
      `}</style>
    </NetworkBoundary>
  )
}

ShowOrg.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Organization>(ctx, `/api/organizations/${ctx.query.id}`)
}

export default withAuthSync(ShowOrg)