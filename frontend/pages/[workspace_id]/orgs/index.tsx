import React from 'react'
import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'
import { NextPageContext } from 'next'
import { Typography } from 'antd';
import Link from 'next/link';
const { Title } = Typography;

const Orgs = (
  { initialData, token }:
  { initialData: Organization[], token?: string }
) => {
  
  const { status, data, error } = useCollection<Organization[]>(
    `/api/organizations`, token, {}, { initialData }
  )

  return (
    <>
      <Title>Organizations</Title>
      <Link href={`/orgs/new`} as={`/orgs/new`}><a>Create an organization</a></Link>

      {data && data.map(o => <div key={o.id}>
        <Link href={`/orgs/[id]`} as={`/orgs/${o.slug}`}>
          <a>
            <h2>{o.name}</h2>
            <p>{o.description}</p>
          </a>
        </Link>
      </div>)}
    </>
  )
}

Orgs.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Organization[]>(ctx, '/api/organizations')
}

export default withAuthSync(Orgs)