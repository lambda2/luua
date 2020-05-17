import React from 'react'
import { withAuthSync } from 'utils/auth'
import WorkspaceForm from 'components/WorkspaceForm/WorkspaceForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import PageTitle from 'elements/PageTitle/PageTitle'
import { useLocale } from 'hooks/useLocale'

const NewWorkspace = (props: any) => {
  const { t } = useLocale()

  return (
    <>
      <ContentLayout>
        <PageTitle title={t('workspace.create.title')} />

        <WorkspaceForm />
      </ContentLayout>
    </>
  )
}

export default withAuthSync(NewWorkspace)