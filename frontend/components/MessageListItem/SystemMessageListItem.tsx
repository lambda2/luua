import React, { useContext, useState } from 'react';
import momentWithLocale from 'i18n/moment';
import { useLocale } from 'hooks/useLocale';
import UserMessageAvatar from 'elements/UserMessageAvatar/UserMessageAvatar';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import UserAvatarTooltip from 'elements/UserAvatarTooltip/UserAvatarTooltip';
import can from 'utils/can';
import UserContext from 'contexts/UserContext';
import Button from 'antd/lib/button';
import DiscussionForm from 'elements/DiscussionInput/DiscussionInput';
import icons from 'dictionaries/icons';
import classNames from 'classnames';
import { MessagePayload } from 'components/Discussion/Discussion';
import MessageContent from 'elements/MessageContent/MessageContent';
import EmbedMessageItem from 'components/EmbedMessageItem/EmbedMessageItem';


interface Props {
  message: Message
  userVote?: MessageVote
  onVote?: (message: Message, vote: MessageVoteOption) => {}
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const SystemMessageListItem = ({
  message,
  userVote,
  onVote,
  onEdit,
  onDestroy
}: Props) => {

  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)

  const moment = momentWithLocale(language as AvailableLocale)

  const contentforSystemMessage = () => {
    return t(`discussion.messages.events.${message.event_type}`, { message })
  }

  const renderMessageHeader = () => {
    return (<header>
      <span className="username"><UserAvatarTooltip withUsername text {...(message.user || t('discussion.deleted_user'))} /></span>
      {' '}
      <span className="datetime text-light">{moment(message.created_at).calendar()}</span>
      <div className="message-actions">
        {can(currentUser, 'message.edit', message) && <Button key="edit" type="link" onClick={() => setEditing(true)}>{t('message.edit')}</Button>}
        {can(currentUser, 'message.destroy', message) && <Button key="destroy" type="link" onClick={() => onDestroy(message)}>{t('message.destroy')}</Button>}
      </div>
    </header>)
  }

  
  return (<>
    <div className="MessageListEventMessage">{contentforSystemMessage()}</div>
    <div className="MessageListItem SystemMessageListItem" id={`${message.id}`}>
      <aside><UserMessageAvatar size="large" name={message?.user?.username || 'deleted-user'} src={message?.user?.thumb_url} /></aside>

      <main>
        {renderMessageHeader()}

        {/* <div className="content">
          <MessageContent serialized_content={message.serialized_content} content={message.content} />
        </div> */}
        {message.resource_type && message.resource && <EmbedMessageItem resource={message.resource} resource_type={message.resource_type} />}
      </main>
    </div>
  </>)

}

export default SystemMessageListItem