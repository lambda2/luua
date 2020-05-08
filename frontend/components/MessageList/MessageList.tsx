import React from 'react';
import MessageListItem from '../MessageListItem/MessageListItem';
import List from '../../elements/List/List';


interface Props {
  messages: Message[]
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const MessageList = ({ messages, onEdit, onDestroy }: Props) => {

  return (
    <List
      className="MessageList"
      dataSource={messages}
      renderItem={(m => <MessageListItem onEdit={onEdit} onDestroy={onDestroy} message={m} />)}
    />
  )

}

export default MessageList