import React, { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import WorkspaceMissionItem from '../WorkspaceMissionItem/WorkspaceMissionItem';
import List from '../../elements/List/List';
import { useLocale } from '../../hooks/useLocale';
const { manage, users } = routes
const { workspace, index } = manage

interface Props {
  data: LightMission[]
}

const WorkspaceMissionList = ({ data }: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  
  return (
  <>
      <List
        itemLayout="vertical"
        size="default"
        dataSource={data}
        emptyText={t('mission.empty')}
        renderItem={(item: LightMission) => <WorkspaceMissionItem {...item} />}
      />
  </>)
}

export default WorkspaceMissionList