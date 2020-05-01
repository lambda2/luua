import React, { useContext } from 'react'
import { withAuthSync } from '../../utils/auth'
import UserEditForm from '../../components/UserEditForm/UserEditForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import PageTitle from '../../elements/PageTitle/PageTitle'
import { useLocale } from '../../hooks/useLocale'
import UserHeader from '../../components/UserHeader/UserHeader'
import UserContext from '../../contexts/UserContext'

const Skills = (props: any) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  return (
    <ContentLayout>
      <UserHeader user={currentUser as AuthedUser} active='edit' />

      <PageTitle title={t('form.user.edit.title')} />
      <UserEditForm />
    </ContentLayout>
  )
}

export default withAuthSync(Skills)