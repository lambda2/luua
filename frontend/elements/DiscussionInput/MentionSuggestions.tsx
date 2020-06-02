import React, { useState, useContext, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useLocale } from 'hooks/useLocale';
import { Button } from 'antd';
// import MarkdownContent from "../MarkdownContent/MarkdownContent";
// import "react-mde/lib/styles/css/react-mde-all.css";

// import { RawDraftContentState } from 'react-draft-wysiwyg';
import { ContentState, EditorState } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css'
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';


import UserContext from 'contexts/UserContext';
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';
import icons from 'dictionaries/icons';
import debounce from 'lodash/debounce';
import api, { isServer } from 'utils/http';
import { search } from 'api/user';
import { nameForUser } from 'utils/user';



interface Props {
  token: string,
  mentionPlugin: any
}

interface UserMentionItem {
  name: string
  username: string
  avatar: string
}


const Entry = (props: any) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;
  
  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <UserMessageAvatar name={mention.username} />
        <span>{mention.name}</span>
      </div>
    </div>
  );
};

/**
 * the little suggestion engine
 */
const MentionSuggestions = ({
  token,
  mentionPlugin
}: Props) => {

  const [suggestions, setSuggestions] = useState<UserMentionItem[]>([])

  const onSearchChange = async ({ value }: { value: string }) => {
    const { data } = await search(value, token)
    setSuggestions(data.map((e: BaseUser) => ({
      name: nameForUser(e),
      username: e.username,
      avatar: e.thumb_url
    })))
  };

  return (<mentionPlugin.MentionSuggestions
    onSearchChange={onSearchChange}
    suggestions={suggestions}
    entryComponent={Entry}
  />)
};

MentionSuggestions.displayName = 'MentionSuggestions'

export default MentionSuggestions