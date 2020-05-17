import React from 'react';
import MessageListItem from '../MessageListItem/MessageListItem';
import List from 'elements/List/List';
import { useLocale } from 'hooks/useLocale';
import find from 'lodash/find';


interface Props {
  messages: Message[]
  userVotes?: MessageVote[]
  onVote?: (message: Message, vote: MessageVoteOption) => {}
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const MessageList = ({
  messages,
  userVotes = [],
  onVote,
  onEdit,
  onDestroy
}: Props) => {

  const { t } = useLocale()
  
  return (
    <List
      className="MessageList"
      dataSource={messages}
      emptyText={t('message.empty')}
      renderItem={(m => <MessageListItem
        onVote={onVote}
        onEdit={onEdit}
        onDestroy={onDestroy}
        message={m}
        userVote={find(userVotes, {message_id: m.id})}
      />)}
    />
  )

}

export default MessageList