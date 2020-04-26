import React from 'react'
import { withAuthSync } from '../../utils/auth'
import UserEditForm from '../../components/UserEditForm/UserEditForm'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'

const Skills = (props: any) => {

  return (
    <ContentLayout>
      <h1>Edit my profile</h1>

      <UserEditForm />
    </ContentLayout>
  )
}

export default withAuthSync(Skills)