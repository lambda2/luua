import React, { useContext } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'

import { useLocale } from '../../../../hooks/useLocale'
import WorkspaceContext from '../../../../contexts/WorkspaceContext'

import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import WorkspaceSettingsMenu from '../../../../layouts/WorkspaceSettingsMenu/WorkspaceSettingsMenu'

import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader'

import WorkspaceInvitationItem from '../../../../elements/WorkspaceInvitationItem/WorkspaceInvitationItem'
import PageTitle from '../../../../elements/PageTitle/PageTitle'
import List from '../../../../elements/List/List'
import WorkspaceInvitationModal from '../../../../components/WorkspaceInvitationModal/WorkspaceInvitationModal'


/**
 * Invitations on a workspace
 */
const WorkspaceInvitations = (
  { initialData, token }:
    { initialData: WorkspaceInvitation[], token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const { status, data, error, refetch } = useCollection<WorkspaceInvitation[]>(
    `/api/workspaces/${query.workspace_id}/workspace_invitations`, token, {}, { initialData }
  )
  const { currentWorkspace } = useContext(WorkspaceContext)

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {currentWorkspace && <WorkspaceHeader
        workspace={currentWorkspace}
        active='settings'
        actions={[]}
      />}

      <ContentLayout sideMenu={<WorkspaceSettingsMenu active='invitations' />}>
        <PageTitle
          title={t('workspace.settings.invitations')}
          extra={[
            <WorkspaceInvitationModal onInvite={refetch} />
          ]}
        />
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: WorkspaceInvitation) => <div key={item.id} style={itemStyle}>
            <WorkspaceInvitationItem {...item} />
            {/* <WorkspaceUserActions
              workspace_user={item}
              onAdmin={onUserAdmin}
              onRegular={onUserRegular}
              onRemove={onUserDelete}
            /> */}
          </div>}
        />
      </ContentLayout>
    </NetworkBoundary>
  )
}

WorkspaceInvitations.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<WorkspaceInvitation[]>(ctx, `/api/workspaces/${ctx.query.workspace_id}/workspace_invitations`)
}

export default withAuthSync(WorkspaceInvitations)