import React, { useState, useContext } from 'react'
import Router from 'next/router'
import UserContext from 'contexts/UserContext'
import SignupForm from 'components/SignupForm/SignupForm'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'


/**
 * This is the signup page
 */
const Signup = () => {

  const { currentUser } = useContext(UserContext)

  if (currentUser) {
    Router.push('/profile')
  }

  return (
    <ContentLayout format="box">
      <SignupForm />
    </ContentLayout>
  )
}

export default Signup