import React, { useState, useContext, useRef, useEffect } from 'react'
import { useLocale } from 'hooks/useLocale';
import { Button } from 'antd';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import ImageAdd from './ImageAdd';
// import createHashtagPlugin from 'draft-js-hashtag-plugin';
// import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from './linkPlugin/linkPlugin'
import createImagePlugin from 'draft-js-image-plugin';
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import createDragNDropUploadPlugin from '@mikeljames/draft-js-drag-n-drop-upload-plugin';

import createMentionPlugin from 'draft-js-mention-plugin';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';


import UserContext from 'contexts/UserContext';
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';
import icons from 'dictionaries/icons';
import debounce from 'lodash/debounce';
import { isServer } from 'utils/http';
import MentionSuggestions from './MentionSuggestions';


const linkPlugin = createLinkPlugin()

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  mentionPrefix: '@',
  supportWhitespace: true
});

// const blockDndPlugin = createBlockDndPlugin();

// const decorator = composeDecorators(
//   blockDndPlugin.decorator
// );
const imagePlugin = createImagePlugin();
// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: (a: any, b: any, c: any, d: any, e: any) => {
//     console.log({ a, b, c, d, e})
//   },
//   addImage: imagePlugin.addImage,
// });

// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const plugins = [
  // hashtagPlugin,
  // dragNDropFileUploadPlugin,
  // blockDndPlugin,
  linkPlugin,
  emojiPlugin,
  mentionPlugin,
  imagePlugin,
  // inlineToolbarPlugin
];


interface Props {
  onSubmit: ({ serialized_content, content } : {serialized_content: string, content: string}) => {}
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

  if (isServer()) {
    return <></>
  }


  const textAeraRef = useRef<HTMLElement>(null)
  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)
  const [serializedContent, setSerializedContent] = useState<string>(message?.serialized_content || markdownToDraft(message?.content || ''))
  const [mdContent, setMdContent] = useState<string>(message?.content || '')

  const startState = message?.serialized_content ?
                    EditorState.createWithContent(convertFromRaw(JSON.parse(message?.serialized_content))) :
                    (message?.content ? EditorState.createWithContent(convertFromRaw(markdownToDraft(message?.content))) : EditorState.createEmpty())

  const [editorState, setEditorState] = useState(startState);
  const [readOnly, setReadOnly] = useState(false);

  const editor = useRef(null)

  const onChange = (state: EditorState) => {
    setEditorState(state)
    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState)
    setMdContent(draftToMarkdown(rawContent))
    setSerializedContent(JSON.stringify(rawContent))
  }

  const onMessageSubmit = async () => {    
    try {
      setReadOnly(true)
      const d = await onSubmit({
        serialized_content: serializedContent,
        content: mdContent
      })
      setReadOnly(false)
      if (d) {
        setEditorState(EditorState.createEmpty())
      }
    } catch (error) {
      console.error(error);
    } finally {
      setReadOnly(false)
    }
  }

  const onImageAdd = (estate: EditorState) => {
    console.log("Change !", { estate });
    setEditorState(estate)
  }

  return (
    <div className="DiscussionForm">
      <div className="MessageVote"></div>
      <aside>{currentUser && <UserMessageAvatar size="large" name={currentUser?.username} src={currentUser?.thumb_url} />}</aside>
      <main className="container" ref={textAeraRef} >
        <div className="DiscussionInput">
          <Editor
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            ref={editor}
            placeholder={'Tapez quelque chose...'}
            readOnly={readOnly}
          />
          <EmojiSuggestions />
          {/* <EmojiSelect /> */}
          {/* <ImageAdd
            editorState={editorState}
            onChange={onImageAdd}
            modifier={imagePlugin.addImage}
          /> */}
          {/* <InlineToolbar /> */}
          <MentionSuggestions mentionPlugin={mentionPlugin} token={currentUser?.jwt || ''}/>
        </div>

        <Button.Group>
          <Button
            type="link"
            disabled={serializedContent.length === 0 || serializedContent == message?.serialized_content}
            loading={isSubmitting}
            onClick={onMessageSubmit}
          >{icons.send}</Button>
          {message && onCancel && <Button type="link" onClick={() => onCancel()}>{t('message.cancel')}</Button>}
        </Button.Group>
      </main>
    </div>
  );
};

DiscussionInput.displayName = 'DiscussionInput'

export default DiscussionInput