import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'

interface UserLoginData {
  email: string
  password: string
  error?: string
}

/**
 * This is the login page
 */
const Login = () => {

  return (
    <ContentLayout format="box">
      <LoginForm />
    </ContentLayout>
  )
}

export default Login