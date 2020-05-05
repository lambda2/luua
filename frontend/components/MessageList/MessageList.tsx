import React, { useContext } from 'react';
import momentWithLocale from '../../i18n/moment';
import { useLocale } from '../../hooks/useLocale';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import MessageListItem from '../MessageListItem/MessageListItem';


interface Props {
  messages: Message[]
}

const MessageList = ({ messages }: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)


  return (
    <ul className="MessageList">
      {messages.map((m: Message) => {
        return <li key={m.id}>
          <MessageListItem message={m} />
        </li>
      })}
    </ul>
  )

}

export default MessageList