import React, { useContext } from 'react';
import momentWithLocale from '../../i18n/moment';
import { useLocale } from '../../hooks/useLocale';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import MessageListItem from '../MessageListItem/MessageListItem';
import List from '../../elements/List/List';


interface Props {
  messages: Message[]
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const MessageList = ({ messages, onEdit, onDestroy }: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)


  return (
    <List
      className="MessageList"
      dataSource={messages}
      renderItem={(m => <MessageListItem onEdit={onEdit} onDestroy={onDestroy} message={m} />)}
    />
  )

}

export default MessageList