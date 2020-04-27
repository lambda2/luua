import React from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useCollection, fetchInitialData } from '../../../utils/http'
import { withAuthSync } from '../../../utils/auth'

import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../layouts/ManageLeftMenu/ManageLeftMenu'

import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceForm from '../../../components/WorkspaceForm/WorkspaceForm';
import WorkspaceHeader from '../../../components/WorkspaceHeader/WorkspaceHeader'
import WorkspaceSettingsMenu from '../../../layouts/WorkspaceSettingsMenu/WorkspaceSettingsMenu'
import PageTitle from '../../../elements/PageTitle/PageTitle'
import { useLocale } from '../../../hooks/useLocale'


/**
 * Edit a workspace
 */
const Workspace = (
  { initialData, token }:
  { initialData: Workspace, token?: string }
) => {
  const { query } = useRouter()
  const { t } = useLocale()

  const { status, data, error } = useCollection<Workspace>(
    `/api/workspaces/${query.workspace_id}`, token, {}, { initialData }
  )

  return (
    <NetworkBoundary status={status} data={data} error={error}>
      {data && <WorkspaceHeader
        workspace={data}
        active='settings'
        actions={[]}
      />}
      <ContentLayout sideMenu={<WorkspaceSettingsMenu active="edit" />}>
        <PageTitle title={t('workspace.edit.title')} />
        {data && <div>
          <WorkspaceForm workspace={data} />
        </div>}
      </ContentLayout>
    </NetworkBoundary>
  )
}

Workspace.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<Workspace>(ctx, `/api/workspaces/${ctx.query.workspace_id}`)
}

export default withAuthSync(Workspace)