import React, { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import WorkspaceMissionItem from '../WorkspaceMissionItem/WorkspaceMissionItem';
import List from '../../elements/List/List';
const { manage, users } = routes
const { workspace, index } = manage

interface Props {
  data: LightMission[]
}

const WorkspaceMissionList = ({ data }: Props) => {

  const { currentUser } = useContext(UserContext)

  return (
  <>
      <List
        itemLayout="vertical"
        size="default"
        // pagination={{
        //   onChange: page => {
        //     console.log(page);
        //   },
        //   pageSize: 3,
        // }}
        dataSource={data}
        // footer={
        //   <div><b>ant design</b> footer part</div>
        // }
        renderItem={(item: LightMission) => <WorkspaceMissionItem {...item} />}
      />
  </>)
}

export default WorkspaceMissionList