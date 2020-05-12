import React from 'react';
import MissionItem from '../MissionItem/MissionItem';
import List from '../../elements/List/List';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: LightMission[]
  activeWorkspace?: number
}

const MissionList = ({ data, activeWorkspace }: Props) => {

  const { t } = useLocale()
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    emptyText={t('mission.empty')}
    renderItem={(item: LightMission) => <MissionItem activeWorkspace={activeWorkspace} mission={item} />}
  />)
}

export default MissionList