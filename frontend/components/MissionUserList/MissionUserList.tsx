import React from 'react';
import MissionUserItem from '../MissionUserItem/MissionUserItem';
import { useLocale } from 'hooks/useLocale';
import List from 'elements/List/List';

interface Props {
  data: MissionUser[]
}

const MissionUserList = ({ data }: Props) => {

  const { t } = useLocale()

  return (
  <>
      <List
        itemLayout="vertical"
        size="default"
        dataSource={data}
        emptyText={t('mission_user.empty')}
        renderItem={(item: MissionUser) => <MissionUserItem {...item} />}
      />
  </>)
}

export default MissionUserList