import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import DiscussionInput from '../../elements/DiscussionInput/DiscussionInput';
import { create, update, destroy } from '../../api/message';
import { useMutation } from 'react-query';
import MessageList from '../MessageList/MessageList';
import Paginated from '../Paginated/Paginated';
import usePaginatedCollection from '../../hooks/usePaginatedCollection';
import can from '../../utils/can';
import MessageBox from '../../elements/MessageBox/MessageBox';
import { useLocale } from '../../hooks/useLocale';
import PageTitle from '../../elements/PageTitle/PageTitle';
import PageSection from '../../elements/PageSection/PageSection';
import { vote } from '../../api/message';
import { useCollection } from '../../utils/http';
import NetworkBoundary from '../NetworkBoudary/NetworkBoudary';
import Title from '../../elements/Title/Title';
import DiscussionCategoryBadge from '../../elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from '../../routes/routes';
import Link from 'next/link';

interface Props {
  discussion?: LightDiscussion
  messagesEndpoint: string | false | 0 | undefined
  votesEndpoint: string | false | 0 | undefined
  page?: number | string,
  token?: string
}

const Discussion = ({
  discussion,
  votesEndpoint,
  messagesEndpoint,
  page = 1,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const messagesResponse = usePaginatedCollection<Message[]>(
    messagesEndpoint, page, (token || currentUser?.jwt)
  )

  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<MessageVote[]>(
    votesEndpoint, (token || currentUser?.jwt)
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

  const voteMessage = async (message: Message, selectedVote: MessageVoteOption) => {
    await vote(message.id, selectedVote, currentUser?.jwt || '')
    await messagesResponse.refetch()
    return await votesResponse?.refetch({ force: true })
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

      <header className="PageTitle DiscussionTitle">
        <Title level={"3"}>
          {discussion?.discussion_category && <DiscussionCategoryBadge size="large" text category={discussion?.discussion_category} />}
          {discussion?.name}
        </Title>
        <aside>
          {discussion && can(currentUser, 'discussion.edit', discussion) &&
            <Link {...ROUTES.manage.workspace.discussions.edit(discussion?.workspace_id, discussion?.slug)}><a>{t(('form.discussion.edit'))}</a></Link>
          }
        </aside>
      </header>

      {/* <NetworkBoundary {...votesResponse}> */}
        <Paginated
          {...messagesResponse}
          renderList={(messages) => <MessageList
            userVotes={votesResponse?.data}
            onVote={voteMessage}
            onEdit={onEdit}
            onDestroy={onDestroy}
            messages={messages} />}
        />
      {/* </NetworkBoundary> */}

      { can(currentUser, 'discussion.post', discussion) &&
        <DiscussionInput onSubmit={onCreate}/> ||
        <MessageBox>{t('discussion.cant-post-auth')}</MessageBox>  
      }
    </div>
  )

}

export default Discussion