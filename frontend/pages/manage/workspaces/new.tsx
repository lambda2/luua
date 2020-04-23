import React from 'react'
import { withAuthSync } from '../../../utils/auth'
import WorkspaceForm from '../../../components/WorkspaceForm/WorkspaceForm'

const NewWorkspace = (props: any) => {

  return (
    <>
      <h1>Create a Workspace</h1>

      <WorkspaceForm />
    </>
  )
}

export default withAuthSync(NewWorkspace)