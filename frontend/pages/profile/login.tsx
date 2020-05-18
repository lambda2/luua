import React from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import { Head } from 'components/Head/Head'
import { useLocale } from 'hooks/useLocale'

interface UserLoginData {
  email: string
  password: string
  error?: string
}

/**
 * This is the login page
 */
const Login = () => {

  const { t } = useLocale()
  
  return (
    <>
      <Head
        title={t('meta.head.pages.users.login.title')}
      />
      <ContentLayout format="box">
        <LoginForm />
      </ContentLayout>
    </>
  )
}

export default Login