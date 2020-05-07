import React, { useContext } from 'react';

import momentWithLocale from '../../i18n/moment';
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';

import DiscussionForm from '../../elements/DiscussionForm/DiscussionForm';
import { create, update, destroy } from '../../api/message';
import { useMutation, queryCache } from 'react-query';
import MessageList from '../MessageList/MessageList';
import { useInfiniteCollection } from '../../utils/http';
import Paginated from '../Paginated/Paginated';

interface Props {
  discussion?: LightDiscussion
  messagesEndpoint: string | false | 0 | undefined
  page?: number | string
}

const Discussion = ({
  discussion,
  messagesEndpoint,
  page = 1
}: Props) => {

  const { currentUser } = useContext(UserContext)

  const messagesResponse = useInfiniteCollection<Message>(
    messagesEndpoint, page, currentUser?.jwt, {}, {}
  )
  
  const createMessage = async (content: string) => {
    if (!discussion) {
      console.error("No discussion to attatch this message !")
      return
    }

    return await create({ content, discussion_id: discussion.id }, currentUser?.jwt || '')
  }

  const editMessage = async (message: Message) => {
    return await update(message, currentUser?.jwt || '')
  }

  const destroyMessage = async (message: Message) => {
    return await destroy(message, currentUser?.jwt || '')
  }

  const [onCreate] = useMutation(createMessage, {
    onSuccess: (data) => {
      console.log("[Message Creation MUTATE] ! onSuccess => ", data);
      
      messagesEndpoint && queryCache.refetchQueries(messagesEndpoint)
    },
    onMutate: (data) => {
      console.log("[Message Creation MUTATE] ! onMutate => ", data);
    },
    onError: (data) => {
      console.log("[Message Creation MUTATE] ! onError => ", data);
    },
    onSettled: (data) => {
      console.log("[Message Creation MUTATE] ! onSettled => ", data);
    }
  })

  const [onEdit] = useMutation(editMessage, {
    onSuccess: (data) => {
      console.log("[Message Edit MUTATE] ! onSuccess => ", data);
      
      messagesEndpoint && queryCache.refetchQueries(messagesEndpoint)
    },
    onMutate: (data) => {
      console.log("[Message Edit MUTATE] ! onMutate => ", data);
    },
    onError: (data) => {
      console.log("[Message Edit MUTATE] ! onError => ", data);
    },
    onSettled: (data) => {
      console.log("[Message Edit MUTATE] ! onSettled => ", data);
    }
  })

  const [onDestroy] = useMutation(destroyMessage, {
    onSuccess: (data) => {
      console.log("[Message Destroy MUTATE] ! onSuccess => ", data);
      
      messagesEndpoint && queryCache.refetchQueries(messagesEndpoint)
    },
    onMutate: (data) => {
      console.log("[Message Destroy MUTATE] ! onMutate => ", data);
    },
    onError: (data) => {
      console.log("[Message Destroy MUTATE] ! onError => ", data);
    },
    onSettled: (data) => {
      console.log("[Message Destroy MUTATE] ! onSettled => ", data);
    }
  })

  return (
    <div className="Discussion">
      <Paginated
        {...messagesResponse}
        renderList={(messages) => <MessageList onEdit={onEdit} onDestroy={onDestroy} messages={messages} />}
      />

      <DiscussionForm onSubmit={onCreate}/>
    </div>
  )

}

export default Discussion