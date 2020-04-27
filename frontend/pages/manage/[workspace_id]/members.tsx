import React, { useContext } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { List } from 'antd'

import { useCollection, fetchInitialData } from '../../../utils/http'
import { withAuthSync } from '../../../utils/auth'

import { useLocale } from '../../../hooks/useLocale'
import WorkspaceContext from '../../../contexts/WorkspaceContext'

import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import WorkspaceSettingsMenu from '../../../layouts/WorkspaceSettingsMenu/WorkspaceSettingsMenu'

import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceHeader from '../../../components/WorkspaceHeader/WorkspaceHeader'

import WorkspaceUserItem from '../../../elements/WorkspaceUserItem/WorkspaceUserItem'
import PageTitle from '../../../elements/PageTitle/PageTitle'


/**
 * Edit a workspace
 */
const WorkspaceMembers = (
  { initialData, token }:
  { initialData: WorkspaceUser[], token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const { status, data, error } = useCollection<WorkspaceUser[]>(
    `/api/workspaces/${query.workspace_id}/workspaces_users`, token, {}, { initialData }
  )
  const { currentWorkspace } = useContext(WorkspaceContext)

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='settings'
        actions={[]}
      />}

      <ContentLayout sideMenu={<WorkspaceSettingsMenu active='members'/>}>
        <PageTitle title={t('workspace.settings.members')} />
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: WorkspaceUser) => <div key={item.id} className="workspace-user-list-item">
            <WorkspaceUserItem {...item} />
          </div>}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

WorkspaceMembers.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<WorkspaceUser[]>(ctx, `/api/workspaces/${ctx.query.workspace_id}/workspaces_users`)
}

export default withAuthSync(WorkspaceMembers)