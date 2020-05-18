import React from 'react';
import PollItem from '../PollItem/PollItem';
import List from 'elements/List/List';
import { useLocale } from 'hooks/useLocale';

interface Props {
  data: LightPoll[]
}

const PollList = ({ data }: Props) => {

  const { t } = useLocale()
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    emptyText={t('poll.empty')}
    renderItem={(item: LightPoll) => <PollItem poll={item} />}
  />)
}

export default PollList