import React, { useContext } from 'react'
import WorkspaceContext from '../../contexts/WorkspaceContext'
import NoWorkspace from '../../components/NoWorkspace/NoWorkspace'
import Router from 'next/router'
import { withAuthSync } from '../../utils/auth'
import LeftMenu from '../../layouts/LeftMenu/LeftMenu'


const ManagePage = () => {

  const { currentWorkspace, workspaces } = useContext(WorkspaceContext)

  if (currentWorkspace) {
    Router.push(`/manage/[workspace_id]`, `/manage/${currentWorkspace.slug}`)
    return <p>GOTO</p> // @TODO
  } else if (workspaces.length > 0) {
    Router.push(`/manage/[workspace_id]`, `/manage/${workspaces[0].slug}`)
    return <p>GOTO</p> // @TODO
  } else {
    return <>
      <LeftMenu />
      <NoWorkspace />
    </>
  } 
}

export default withAuthSync(ManagePage)
// export default ManagePage
