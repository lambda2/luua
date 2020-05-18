import React, { useState, useContext } from 'react'
import Router from 'next/router'
import UserContext from 'contexts/UserContext'
import SignupForm from 'components/SignupForm/SignupForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import { Head } from 'components/Head/Head'
import { useLocale } from 'hooks/useLocale'


/**
 * This is the signup page
 */
const Signup = () => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  if (currentUser) {
    Router.push('/profile')
  }

  return (
    <>
      <Head
        title={t('meta.head.pages.users.signup.title')}
      />
      <ContentLayout format="box">
        <SignupForm />
      </ContentLayout>
    </>
  )
}

export default Signup