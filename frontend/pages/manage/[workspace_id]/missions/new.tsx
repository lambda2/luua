import React from 'react'
import { withAuthSync } from '../../../../utils/auth'
import MissionSetup from '../../../../components/MissionSetup/MissionSetup'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'

const NewMission = (props: any) => {

  return (
    <ContentLayout sideMenu={<ManageLeftMenu />}>
      <MissionSetup />
    </ContentLayout>
  )
}

export default withAuthSync(NewMission)
