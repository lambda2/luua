import React, { useState, useContext, useRef, useEffect } from 'react'
import UserMessageAvatar from '../UserMessageAvatar/UserMessageAvatar';
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