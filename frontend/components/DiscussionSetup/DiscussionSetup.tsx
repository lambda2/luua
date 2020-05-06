import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import WorkspaceForm from '../WorkspaceForm/WorkspaceForm';
import DiscussionForm from '../DiscussionForm/DiscussionForm';
import { Typography } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import WorkspaceContext from '../../contexts/WorkspaceContext';
const { Title } = Typography;

interface Props {
  discussion?: Discussion
}

const DiscussionSetup = ({ discussion }: Props) => {
  
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  if (currentUser.workspaces.length === 0) {
    return <div>
      <h2>To create a discussion, you need to create a workspace first.</h2>
      <WorkspaceForm redirectOnSave={'/discussions/new'}/>
    </div>
  }

  return (<div>
    <DiscussionForm workspace={currentWorkspace || undefined}/>
  </div>)
}

export default DiscussionSetup
