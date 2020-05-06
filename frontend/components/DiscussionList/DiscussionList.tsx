import React from 'react';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import List from '../../elements/List/List';

interface Props {
  data: LightDiscussion[]
}

const DiscussionList = ({ data }: Props) => {
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    renderItem={(item: LightDiscussion) => <DiscussionItem discussion={item} />}
  />)
}

export default DiscussionList