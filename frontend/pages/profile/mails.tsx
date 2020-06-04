import React, { useContext } from 'react'
import { withAuthSync } from 'utils/auth'
import UserEditMailsForm from 'components/UserEditMailsForm/UserEditMailsForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import PageTitle from 'elements/PageTitle/PageTitle'
import { useLocale } from 'hooks/useLocale'
import UserHeader from 'components/UserHeader/UserHeader'
import UserContext from 'contexts/UserContext'
import Loader from 'elements/Loader/Loader'
import UserSettingsMenu from 'layouts/UserSettingsMenu/UserSettingsMenu'

const EditUserEmails = (props: any) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Loader />
  }

  return (
    <>
      <UserHeader user={currentUser as AuthedUser} active='edit' />
      <ContentLayout sideMenu={<UserSettingsMenu active='mails' />}>
        <PageTitle title={t('form.user.mails.title')} />
        <UserEditMailsForm />
      </ContentLayout>
    </>
  )
}

export default withAuthSync(EditUserEmails)