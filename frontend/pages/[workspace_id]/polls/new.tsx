import React, { useContext } from 'react'
import { withAuthSync } from 'utils/auth'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'
import PollForm from 'components/PollForm/PollForm'

/**
 * Form to create a new poll
 */
const NewPoll = (props: any) => {

  const { currentWorkspace } = useContext(WorkspaceContext)

  return (<>
    {currentWorkspace && <WorkspaceHeader
      workspace={currentWorkspace}
      active='votes'
    />}
    <ContentLayout>
      <PollForm workspace_id={currentWorkspace?.id || undefined} />
    </ContentLayout>
  </>)
}

export default withAuthSync(NewPoll)
