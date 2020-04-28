import React from 'react'
import { useCollection, fetchInitialData } from '../../../utils/http'
import { withAuthSync } from '../../../utils/auth'
import NetworkBoundary from '../../../components/NetworkBoudary/NetworkBoudary'
import WorkspaceList from '../../../components/WorkspaceList/WorkspaceList'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'antd'
import LeftMenu from '../../../layouts/LeftMenu/LeftMenu'
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../../elements/PageTitle/PageTitle'
import { useLocale } from '../../../hooks/useLocale'
import ROUTES from '../../../routes/manage'

const Workspaces = (
  { initialData, token }:
  { initialData: LightWorkspace[], token?: string }
) => {
  const { t } = useLocale()

  const response = useCollection<LightWorkspace[]>(
    `/api/me/workspaces`, token, {}, { initialData }
  )

  return (
    <>
      <NetworkBoundary<LightWorkspace[]> {...response}>
        <ContentLayout>
          <PageTitle
            title={t('menu.workspaces')}
            extra={[
              <Link {...ROUTES.manage.workspace.new()}><a>{t('workspace.create.title')}</a></Link>
            ]}
          />
          
          <WorkspaceList data={response.data as LightWorkspace[]} />
        </ContentLayout>
      </NetworkBoundary>
    </>
  )
}

Workspaces.getInitialProps = async (ctx: NextPageContext) => {
  return await fetchInitialData<LightWorkspace[]>(ctx, '/api/me/workspaces')
}

export default withAuthSync(Workspaces)