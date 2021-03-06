import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import Discussion from 'components/Discussion/Discussion'
import { useContext } from 'react'
import WorkspaceContext from 'contexts/WorkspaceContext'
import MissionHeader from 'components/MissionHeader/MissionHeader'
import { useLocale } from 'hooks/useLocale'
// import DiscussionLeftMenu from 'layouts/DiscussionsLeftMenu/DiscussionLeftMenu'
import MessageBox from 'elements/MessageBox/MessageBox'
import { onDestroy } from 'utils/mission'
import UserContext from 'contexts/UserContext'


/**
 * Show the mission main discussion
 */
const MissionDiscussion = (
  { initialData, token }:
    { initialData: Mission, token?: string }
) => {
  const { query } = useRouter()
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const { status, data, error } = useCollection<Mission>(
    `/api/missions/${query.id}`, token, {}, { initialData }
  )

  const discussion = ((data?.discussions?.length || 0) > 0) && data?.discussions[0] || undefined

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <MissionHeader
        workspace={currentWorkspace}
        mission={data as Mission}
        onDestroy={(m) => onDestroy(m, token || currentUser?.jwt || '')}
        active='discussion'
      />}
      <ContentLayout>
        {!discussion?.id && <p className="text-light text-centered">{t('discussion.no-discussion')}</p>}
        <Discussion
          discussion={discussion as Discussion}
          messagesEndpoint={discussion?.id && `/api/discussions/${discussion?.id}/messages`}
          votesEndpoint={discussion?.id && `/api/discussions/${discussion?.id}/message_votes/mines`}
          initialPage={query.page && parseInt(query.page as string) || undefined}
          token={token}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

MissionDiscussion.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Mission>(ctx, `/api/missions/${ctx.query.id}`)
}

export default withAuthSync(MissionDiscussion)