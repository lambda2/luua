import React from 'react';
import WorkspaceMissionItem from '../WorkspaceMissionItem/WorkspaceMissionItem';
import List from '../../elements/List/List';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: LightMission[]
}

const WorkspaceMissionList = ({ data }: Props) => {

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