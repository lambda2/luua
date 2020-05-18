import React from 'react'
import { withUserToken } from 'utils/auth'
import { useCollection, fetchInitialData } from 'utils/http'
import { useRouter } from 'next/router'
import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next'
import UserShow from 'components/UserShow/UserShow'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import UserHeader from 'components/UserHeader/UserHeader'
import PageSection from 'elements/PageSection/PageSection'
import { useLocale } from 'hooks/useLocale'
import List from 'elements/List/List'
import MissionUserItem from 'components/MissionUserItem/MissionUserItem'
import WorkspaceItem from 'components/WorkspaceItem/WorkspaceItem'
import Head from 'components/Head/Head'
import { nameForUser } from 'utils/user'

/**
 * Show the requested user, as a member of it
 */
const ShowUser = (
  { initialData, token }:
    { initialData: User, token?: string }
) => {
  const { query } = useRouter()
  const userResponse = useCollection<User>(
    `/api/users/${query.username}`, token, {}, { initialData }
  )
  const userWorkspacesResponse = useCollection<WorkspaceUser[]>(
    `/api/users/${query.username}/workspace_users`, token, {}, {}
  )
  const userMissionsResponse = useCollection<LightMissionUser[]>(
    `/api/users/${query.username}/mission_users`, token, {}, {}
  )

  const { t } = useLocale()
  
  return (
    <>
      <Head
        title={t('meta.head.pages.users.index.title', {name: nameForUser(initialData)})}
        ogImage={initialData.image_url}
      />
      <NetworkBoundary {...userResponse}>
        <UserHeader
          user={userResponse!.data as User}
          active='summary'
        />
        <ContentLayout>
          <UserShow user={userResponse!.data as User} />
          <NetworkBoundary {...userWorkspacesResponse}>
            {userWorkspacesResponse.data && <PageSection title={t('menu.workspaces')}>
              <List
                dataSource={userWorkspacesResponse!.data}
                renderItem={(e: WorkspaceUser) => <WorkspaceItem {...e.workspace as Workspace} />}
              />
            </PageSection>}
          </NetworkBoundary>

          <NetworkBoundary {...userMissionsResponse}>
            {userMissionsResponse.data && <PageSection title={t('menu.missions')}>
              <List
                dataSource={userMissionsResponse!.data}
                renderItem={(e: LightMissionUser) => <MissionUserItem {...e} user={userResponse!.data as User} mission={e.mission} />}
              />
            </PageSection>}

          </NetworkBoundary>
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}




ShowUser.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<User>(ctx, `/api/users/${ctx.query.username}`)
}

export default withUserToken(ShowUser)