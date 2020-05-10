import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import DiscussionForm from '../../elements/DiscussionForm/DiscussionForm';
import { create, update, destroy } from '../../api/message';
import { useMutation } from 'react-query';
import MessageList from '../MessageList/MessageList';
import Paginated from '../Paginated/Paginated';
import usePaginatedCollection from '../../hooks/usePaginatedCollection';

interface Props {
  discussion?: LightDiscussion
  messagesEndpoint: string | false | 0 | undefined
  page?: number | string,
  token?: string
}

const Discussion = ({
  discussion,
  messagesEndpoint,
  page = 1,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)

  console.log("Requesting messages with: ", { token, jwt: currentUser?.jwt });
  
  if (!token && !currentUser?.jwt) {
    return <span>Loading</span>
  }

  const messagesResponse = usePaginatedCollection<Message[]>(
    messagesEndpoint, page, (token || currentUser?.jwt)
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
      
      messagesResponse.refetch()
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
      
      messagesResponse.refetch()
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
      
      messagesResponse.refetch()
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