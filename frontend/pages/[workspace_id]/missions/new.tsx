import MissionSetup from 'components/MissionSetup/MissionSetup';
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader';
import WorkspaceContext from 'contexts/WorkspaceContext';
import ContentLayout from 'layouts/ContentLayout/ContentLayout';
import React, { useContext } from 'react';
import { withAuthSync } from 'utils/auth';

/**
 * Form to create a new mission
 */
const NewMission = (props: any) => {

  const { currentWorkspace } = useContext(WorkspaceContext)

  return (<>
    {currentWorkspace && <WorkspaceHeader
      workspace={currentWorkspace}
      active='missions'
    />}
    <ContentLayout>
      <MissionSetup workspace_id={currentWorkspace?.id} />
    </ContentLayout>
  </>)
}

export default withAuthSync(NewMission)
