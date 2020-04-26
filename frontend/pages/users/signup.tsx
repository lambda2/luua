import React, { useState, useContext } from 'react'
import { signupWithCredentials } from '../../utils/auth'
import Router from 'next/router'
import UserContext from '../../contexts/UserContext'
import SignupForm from '../../components/SignupForm/SignupForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'


/**
 * This is the login form component
 */
const Login = () => {

  const { currentUser } = useContext(UserContext)

  if (currentUser) {
    Router.push('/users/profile')
  }

  return (
    <ContentLayout format="box">
      <SignupForm />
    </ContentLayout>
  )
}

export default Login