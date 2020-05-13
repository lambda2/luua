import React, { useState, useContext, useRef, useEffect } from 'react'
import { useLocale } from '../../hooks/useLocale';
import { Button } from 'antd';
import MarkdownContent from "../MarkdownContent/MarkdownContent";
import "react-mde/lib/styles/css/react-mde-all.css";

import ReactMde from "react-mde";
import UserContext from '../../contexts/UserContext';
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';
import icons from '../../dictionaries/icons';
import debounce from 'lodash/debounce';


interface Props {
  onSubmit: (message: string) => {}
  onCancel?: () => void
  isSubmitting?: boolean
  message?: Message
}

/**
 * A form to create or edit a discussion message
 */
const DiscussionInput: React.FC<Props> = ({
  isSubmitting = false,
  onSubmit,
  onCancel,
  message
}) => {

  const textAeraRef = useRef<HTMLElement>(null)
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)
  const [content, setContent] = useState<string>(message?.content || '')
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");


  // Allow submit form with CMD + ENTER
  useEffect(() => {

    const onKeydown = async (e: KeyboardEvent) => {
      if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
        if (!isSubmitting) {
          await onSubmit(content)
          setContent('')
        } else {
          console.log("Not submiting");
        }
      }
    }

    const deb = debounce(onKeydown, 100)
    
    textAeraRef.current?.addEventListener('keydown', deb);
    return () => {
      textAeraRef.current?.removeEventListener('keydown', deb);
    }
  }, [content])


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
      <div className="MessageVote"></div>
      <aside>{currentUser && <UserMessageAvatar size="large" name={currentUser?.username} src={currentUser?.thumb_url} />}</aside>
      <main className="container" ref={textAeraRef} >
        <ReactMde
          minEditorHeight={50}
          l18n={{ write: <span>{t('generics.write')}</span>, preview: <span>{t('generics.preview')}</span> }}
          value={content}
          onChange={setContent}
          classes={classes}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<MarkdownContent content={markdown} />)
          }
        />
        <Button.Group>
          <Button type="link" disabled={content.length === 0 || content == message?.content} loading={isSubmitting} onClick={() => onSubmit(content)}>{icons.send}</Button>
          {message && onCancel && <Button type="link" onClick={() => onCancel()}>{t('message.cancel')}</Button>}
        </Button.Group>
      </main>
    </div>
  );
};

DiscussionInput.displayName = 'DiscussionInput'

export default DiscussionInput