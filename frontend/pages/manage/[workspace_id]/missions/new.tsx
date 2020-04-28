import React, { useContext } from 'react'
import { withAuthSync } from '../../../../utils/auth'
import MissionSetup from '../../../../components/MissionSetup/MissionSetup'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import WorkspaceContext from '../../../../contexts/WorkspaceContext'
import WorkspaceHeader from '../../../../components/WorkspaceHeader/WorkspaceHeader'
import Link from 'next/link'

const NewMission = (props: any) => {

  const { currentWorkspace } = useContext(WorkspaceContext)

  return (<>
    {currentWorkspace && <WorkspaceHeader
      workspace={currentWorkspace}
      active='missions'
    />}
    <ContentLayout>
      <MissionSetup />
    </ContentLayout>
  </>)
}

export default withAuthSync(NewMission)
