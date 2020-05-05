import React, { useState, useContext } from 'react'
import { useLocale } from '../../hooks/useLocale';
import { Button } from 'antd';
import MarkdownContent from "../../elements/MarkdownContent/MarkdownContent";
// import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import ReactMde from "react-mde";
import UserContext from '../../contexts/UserContext';
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';


interface Props {
  onSubmit: (message: string) => {}
  isSubmitting?: boolean
}

/**
 * Our own submit button
 */
const DiscussionForm: React.FC<Props> = ({
  isSubmitting = false,
  onSubmit
}) => {

  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)
  const [message, setMessage] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const classes = {
    reactMde: 'DiscussionFormEditor',
    toolbar: 'DiscussionFormToolbar',
    preview: 'DiscussionFormPreview',
    textArea: 'DiscussionFormText',
    grip: 'DiscussionFormGrip',
    suggestionsDropdown: 'DiscussionFormDropdown'
  }

  return (
    <div className="DiscussionForm">
      <aside>{currentUser && <UserMessageAvatar size="large" name={currentUser?.username} src={currentUser?.thumb_url} />}</aside>
      <main className="container">
        <ReactMde
          minEditorHeight={100}
          l18n={{ write: <span>{t('generics.write')}</span>, preview: <span>{t('generics.preview')}</span> }}
          value={message}
          onChange={setMessage}
          classes={classes}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<MarkdownContent content={markdown} />)
          }
        />
        <Button disabled={message.length === 0} loading={isSubmitting} onClick={() => onSubmit(message)}>{t('message.send')}</Button>
      </main>
    </div>
  );
};

DiscussionForm.displayName = 'DiscussionForm'

export default DiscussionForm