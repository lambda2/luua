import React, { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../contexts/UserContext';
import List from '../../elements/List/List';
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem';

interface Props {
  data?: LightWorkspace[]
}

const WorkspaceList = ({ data }: Props) => {

  const { currentUser } = useContext(UserContext)

  return (<List
    dataSource={data}
    renderItem={(e) => <WorkspaceItem {...e}/>}
    />)
}

export default WorkspaceList