import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import MissionItem from '../MissionItem/MissionItem';
import { List } from 'antd';

interface Props {
  data: LightMission[]
}

const MissionList = ({ data }: Props) => {

  return (
  <>
      <List
        itemLayout="vertical"
        size="default"
        dataSource={data}
        renderItem={(item: LightMission) => <MissionItem {...item} />}
      />
  </>)
}

export default MissionList