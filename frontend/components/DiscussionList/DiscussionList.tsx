import React from 'react';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import List from 'elements/List/List';
import { useLocale } from 'hooks/useLocale';

interface Props {
  data: LightDiscussion[]
  readings?: DiscussionReading[]
}

const DiscussionList = ({
  data,
  readings
}: Props) => {

  const { t } = useLocale()
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    border={false}
    emptyText={t('discussion.empty')}
    renderItem={(item: LightDiscussion) => <DiscussionItem 
      discussion={item}
      reading={readings ? readings.find(r => r.discussion_id === item.id) : false}
    />}
  />)
}

export default DiscussionList