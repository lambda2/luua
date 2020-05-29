import React from 'react'
import { useCollection, fetchInitialData } from 'utils/http'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import MissionList from 'components/MissionList/MissionList'
import { Typography } from 'antd';
import { NextPageContext } from 'next';
import { useLocale } from 'hooks/useLocale';
import ContentLayout from 'layouts/ContentLayout/ContentLayout';
import PageTitle from 'elements/PageTitle/PageTitle';
import ExploreHeader from 'components/ExploreHeader/ExploreHeader';
import StackedLineChart from 'elements/StackedLineChart/StackedLineChart';
import moment from 'moment';
const { Title } = Typography;

interface StatResponse {
  users: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
  discussions: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
  counters: {
    users: number
    workspaces: number
    discussions: number
    messages: number
    polls: number
    missions: number
  }
  latest: {
    users: Array<{
      username: string
      created_at: string
    }>
  }
}

interface Props {
  initialData: StatResponse,
  token?: string
}

const StatsPage = (
  { initialData, token }: Props
) => {

  const response = useCollection<StatResponse>(
    `/api/stats`, token, {}, { initialData }
  )

  return (
    <>
      {/* <ExploreHeader
        active='missions'
      /> */}
      <div className="ExploreHeader">
        <header className="ExploreHeaderContent">
          <PageTitle
            level='1'
            title={'Stats'}
          >
          </PageTitle>
        </header>
      </div>
      <NetworkBoundary<StatResponse> {...response}>
        {response.data && <ContentLayout>
          <div className="StatsPanelsTitle">General stats</div>
          <div className="StatsPanels">
            <ul>
              <li><b>{response.data.counters.users}</b> users</li>
              <li><b>{response.data.counters.workspaces}</b> workspaces</li>
              <li><b>{response.data.counters.discussions}</b> discussions</li>
              <li><b>{response.data.counters.messages}</b> messages</li>
              <li><b>{response.data.counters.polls}</b> polls</li>
              <li><b>{response.data.counters.missions}</b> missions</li>
            </ul>
          </div>
          <div className="StatsPanelsTitle">Latest users</div>
          <div className="StatsPanels">
            <ul>
              {response.data.latest.users.map(({ username, created_at }) => (
                <li key={username}>
                  <b>{username}</b>
                  <footer>{moment(created_at).calendar()}</footer>
                </li>
              ))}
            </ul>
          </div>
          <div className="StatsPanels">
            
            <div className="Panel text-centered">
              <span className="StatsPanelsTitle">Users</span>
              <StackedLineChart id="users" color="#5e81ac" data={response.data?.users} />
            </div>
            
            <div className="Panel text-centered">
              <span className="StatsPanelsTitle">Discussions</span>
              <StackedLineChart id="discussions" color="#5e81ac" data={response.data?.discussions} />
            </div>
          </div>
        </ContentLayout>}
      </NetworkBoundary>
    </>
  )
}

StatsPage.getInitialProps = async (ctx: NextPageContext) => {
  const data = await fetchInitialData<StatResponse>(ctx, '/api/stats')
  return data
}

export default StatsPage
