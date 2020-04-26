import React from 'react'
import FullLoginForm from '../../components/LoginForm/LoginForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'

interface UserLoginData {
  email: string
  password: string
  error?: string
}

/**
 * This is the login form component
 */
const Login = () => {

  return (
    <ContentLayout format="box">
      <FullLoginForm />
    </ContentLayout>
  )
}

export default Login