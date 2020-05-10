import React, { useContext, useState } from 'react';
import momentWithLocale from '../../i18n/moment';
import { useLocale } from '../../hooks/useLocale';
import UserMessageAvatar from '../../elements/UserMessageAvatar/UserMessageAvatar';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import UserAvatarTooltip from '../../elements/UserAvatarTooltip/UserAvatarTooltip';
import can from '../../utils/can';
import UserContext from '../../contexts/UserContext';
import Button from 'antd/lib/button';
import DiscussionForm from '../../elements/DiscussionInput/DiscussionInput';


interface Props {
  message: Message
  onEdit: (message: Message) => {}
  onDestroy: (message: Message) => {}
}

const MessageListItem = ({ message, onEdit, onDestroy }: Props) => {

  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)
  const [isEditing, setEditing] = useState<boolean>(false)

  const moment = momentWithLocale(language as AvailableLocale)

  const onFormEdit = async (content: string) => {
    await onEdit({ ...message, content })
    setEditing(false)
  }

  const renderMessageHeader = () => {
    return (<header>
      <span className="username"><UserAvatarTooltip {...message.user} /></span>
      {' '}
      <span className="datetime text-light">{moment(message.created_at).calendar()}</span>
      <div className="message-actions">
        {can(currentUser, 'message.edit', message) && <Button type="link" onClick={() => setEditing(true)}>{t('message.edit')}</Button>}
        {can(currentUser, 'message.destroy', message) && <Button type="link" onClick={() => onDestroy(message)}>{t('message.destroy')}</Button>}
      </div>
    </header>)
  }

  if (isEditing) {
    return <DiscussionForm onSubmit={onFormEdit} onCancel={() => setEditing(false)} message={message}/>
  } else {
    return (
      <div className="MessageListItem" id={`${message.id}`}>
        <aside>{message.user && <UserMessageAvatar size="large" name={message.user?.username} src={message.user?.thumb_url} />}</aside>
        <main>
          { renderMessageHeader() }
          <div className="content">
            <MarkdownContent content={message.content} />
          </div>
        </main>
      </div>
    )
  }

}

export default MessageListItem