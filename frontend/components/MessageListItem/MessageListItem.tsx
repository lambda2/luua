import React, { useContext } from 'react';
import momentWithLocale from '../../i18n/moment';
import { useLocale } from '../../hooks/useLocale';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import { nameForUser } from '../../utils/user';
import UserAvatarTooltip from '../../elements/UserAvatarTooltip/UserAvatarTooltip';


interface Props {
  message: Message
}

const MessageListItem = ({ message }: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  return (
    <div className="MessageListItem" id={`${message.id}`}>
      <aside>{message.user && <UserAvatar name={message.user?.username} src={message.user?.thumb_url} />}</aside>
      <main>
        <header>
          <span className="username"><UserAvatarTooltip {...message.user} /></span>
          {' '}
          <span className="datetime text-light">{moment(message.created_at).calendar()}</span>

        </header>
        <div className="content">
          <MarkdownContent content={message.content} />
        </div>
      </main>
    </div>
  )

}

export default MessageListItem