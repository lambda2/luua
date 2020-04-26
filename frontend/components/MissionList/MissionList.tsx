import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import MissionItem from '../MissionItem/MissionItem';
import { List } from 'antd';
import PageSection from '../../elements/PageSection/PageSection';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: LightMission[]
}

const MissionList = ({ data }: Props) => {

  const { t } = useLocale()
  
  return (
  <>
      <PageSection title={t('menu.missions')}>
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: LightMission) => <MissionItem {...item} />}
        />
      </PageSection>
  </>)
}

export default MissionList