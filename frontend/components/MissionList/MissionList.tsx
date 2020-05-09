import React from 'react';
import MissionItem from '../MissionItem/MissionItem';
import List from '../../elements/List/List';

interface Props {
  data: LightMission[]
  activeWorkspace?: number
}

const MissionList = ({ data, activeWorkspace }: Props) => {
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    renderItem={(item: LightMission) => <MissionItem activeWorkspace={activeWorkspace} mission={item} />}
  />)
}

export default MissionList