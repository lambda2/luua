import React from 'react';
import MessageListItem from '../MessageListItem/MessageListItem';
import List from '../../elements/List/List';
import { useLocale } from '../../hooks/useLocale';


interface Props {
  messages: Message[]
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const MessageList = ({ messages, onEdit, onDestroy }: Props) => {

  const { t } = useLocale()
  
  return (
    <List
      className="MessageList"
      dataSource={messages}
      emptyText={t('message.empty')}
      renderItem={(m => <MessageListItem onEdit={onEdit} onDestroy={onDestroy} message={m} />)}
    />
  )

}

export default MessageList