import React from 'react'
import { withAuthSync } from '../../utils/auth'
import UserEditForm from '../../components/UserEditForm/UserEditForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import PageTitle from '../../elements/PageTitle/PageTitle'
import { useLocale } from '../../hooks/useLocale'

const Skills = (props: any) => {
  const { t } = useLocale()

  return (
    <ContentLayout>
      <PageTitle title={t('form.user.edit.title')} />
      <UserEditForm />
    </ContentLayout>
  )
}

export default withAuthSync(Skills)