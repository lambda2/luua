import React, { useContext } from 'react';
import Link from 'next/link';
import routes from '../../routes/manage'
import MissionUserItem from '../MissionUserItem/MissionUserItem';
import { List } from 'antd';

interface Props {
  data: MissionUser[]
}

const MissionUserList = ({ data }: Props) => {

  return (
  <>
      <List
        itemLayout="vertical"
        size="default"
        dataSource={data}
        renderItem={(item: MissionUser) => <MissionUserItem {...item} />}
      />
  </>)
}

export default MissionUserList