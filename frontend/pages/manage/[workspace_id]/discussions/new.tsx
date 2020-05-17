import React, { useContext } from 'react'
import { withAuthSync } from 'utils/auth'
import DiscussionSetup from 'components/DiscussionSetup/DiscussionSetup'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import WorkspaceContext from 'contexts/WorkspaceContext'
import WorkspaceHeader from 'components/WorkspaceHeader/WorkspaceHeader'

/**
 * Form to create a new discussion
 */
const NewDiscussion = (props: any) => {

  const { currentWorkspace } = useContext(WorkspaceContext)

  return (<>
    {currentWorkspace && <WorkspaceHeader
      workspace={currentWorkspace}
      active='discussions'
    />}
    <ContentLayout>
      <DiscussionSetup />
    </ContentLayout>
  </>)
}

export default withAuthSync(NewDiscussion)
