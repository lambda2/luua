import React, { useContext } from 'react'
import { withAuthSync } from 'utils/auth'
import UserEditForm from 'components/UserEditForm/UserEditForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import PageTitle from 'elements/PageTitle/PageTitle'
import { useLocale } from 'hooks/useLocale'
import UserHeader from 'components/UserHeader/UserHeader'
import UserContext from 'contexts/UserContext'
import Loader from 'elements/Loader/Loader'

const EditUser = (props: any) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Loader />
  }

  return (
    <ContentLayout>
      <UserHeader user={currentUser as AuthedUser} active='edit' />

      <PageTitle title={t('form.user.edit.title')} />
      <UserEditForm />
    </ContentLayout>
  )
}

export default withAuthSync(EditUser)