import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import WorkspaceForm from '../WorkspaceForm/WorkspaceForm';
import MissionForm from '../MissionForm/MissionForm';
import { Typography } from 'antd';
import { useLocale } from '../../hooks/useLocale';
const { Title } = Typography;

interface Props {
  mission?: Mission
}

const MissionSetup = ({ mission }: Props) => {

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
    <MissionForm />
  </div>)
}

export default MissionSetup
