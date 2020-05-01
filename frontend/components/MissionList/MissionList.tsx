import React from 'react';
import MissionItem from '../MissionItem/MissionItem';
import List from '../../elements/List/List';

interface Props {
  data: LightMission[]
}

const MissionList = ({ data }: Props) => {
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    renderItem={(item: LightMission) => <MissionItem {...item} />}
  />)
}

export default MissionList