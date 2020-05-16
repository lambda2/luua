import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import WorkspaceForm from '../WorkspaceForm/WorkspaceForm';
import MissionForm from '../MissionForm/MissionForm';
import { Typography } from 'antd';
import { useLocale } from '../../hooks/useLocale';
const { Title } = Typography;

interface Props {
  mission?: Mission
  workspace_id?: number
}

const MissionSetup = ({ mission, workspace_id }: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  if (currentUser.workspaces.length === 0) {
    return <div>
      <h2>To create a mission, you need to create a workspace first.</h2>
      <WorkspaceForm redirectOnSave={'/missions/new'}/>
    </div>
  }

  return (<div>
    <MissionForm workspace_id={workspace_id} />
  </div>)
}

export default MissionSetup
