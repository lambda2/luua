import React, { useContext } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from 'utils/http'
import { withAuthSync } from 'utils/auth'

import { useLocale } from 'hooks/useLocale'
import WorkspaceContext from 'contexts/WorkspaceContext'

import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceSettingsMenu from 'layouts/WorkspaceSettingsMenu/WorkspaceSettingsMenu'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'

import DiscussionCategoryItem from 'elements/DiscussionCategoryItem/DiscussionCategoryItem'
import PageTitle from 'elements/PageTitle/PageTitle'
import List from 'elements/List/List'
import DiscussionCategoryModal from 'components/DiscussionCategoryModal/DiscussionCategoryModal'
import { destroy } from 'api/discussion_category'
import { queryCache } from 'react-query'
import UserContext from 'contexts/UserContext'


/**
 * Categories on a workspace
 */
const WorkspaceCategories = (
  { initialData, token }:
    { initialData: DiscussionCategory[], token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const { status, data, error, refetch } = useCollection<DiscussionCategory[]>(
    `/api/workspaces/${query.workspace_id}/discussion_categories`, token, {}, { initialData }
  )
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const onUpdate = async () => {
    console.log("Update !");
    queryCache.refetchQueries(`/api/workspaces/${query.workspace_id}/discussion_categories`)
  }

  const onDelete = async (id: number) => {
    console.log("Update !");
    await destroy({ id }, token || currentUser?.jwt || '')
    queryCache.refetchQueries(`/api/workspaces/${query.workspace_id}/discussion_categories`)
  }

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='settings'
        actions={[]}
      />}

      <ContentLayout sideMenu={<WorkspaceSettingsMenu active='categories' />}>
        <PageTitle
          title={t('workspace.settings.categories')}
          extra={[
            <DiscussionCategoryModal label={t('discussion_category.add')} onUpdate={onUpdate} />
          ]}
        />
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: DiscussionCategory) => <div key={item.id} style={itemStyle}>
            <DiscussionCategoryItem
              onUpdate={onUpdate}
              onDelete={onDelete}
              discussion_category={item}
            />
          </div>}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

WorkspaceCategories.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<DiscussionCategory[]>(ctx, `/api/workspaces/${ctx.query.workspace_id}/discussion_categories`)
}

export default withAuthSync(WorkspaceCategories)