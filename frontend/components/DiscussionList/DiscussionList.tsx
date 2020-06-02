import React from 'react';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import List from 'elements/List/List';
import { useLocale } from 'hooks/useLocale';

interface Props {
  data: LightDiscussion[]
  readings?: DiscussionReading[]
  onVote?: (message: Message, vote: MessageVoteOption) => {}
  userVotes?: MessageVote[]
}

const DiscussionList = ({
  data,
  userVotes = [],
  onVote,
  readings
}: Props) => {

  const { t } = useLocale()
  
  return (<List
    itemLayout="vertical"
    size="default"
    dataSource={data}
    // border={false}
    emptyText={t('discussion.empty')}
    renderItem={(item: LightDiscussion) => <DiscussionItem 
      key={item.id}
      discussion={item}
      onVote={onVote}
      userVote={userVotes.find(uv => uv.message_id === item.root_message?.id)}
      reading={readings ? readings.find(r => r.discussion_id === item.id) : false}
    />}
  />)
}

export default DiscussionList