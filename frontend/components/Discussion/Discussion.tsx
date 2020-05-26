import React, { useContext } from 'react';

import UserContext from 'contexts/UserContext';

import DiscussionInput from 'elements/DiscussionInput/DiscussionInput';
import { create, update, destroy } from 'api/message';
import { destroy as destroyDiscussion } from 'api/discussion';
import { useMutation } from 'react-query';
import MessageList from '../MessageList/MessageList';
import Paginated from '../Paginated/Paginated';
import usePaginatedCollection from 'hooks/usePaginatedCollection';
import can from 'utils/can';
import MessageBox from 'elements/MessageBox/MessageBox';
import { useLocale } from 'hooks/useLocale';
import { vote } from 'api/message';
import { useCollection } from 'utils/http';
import Title from 'elements/Title/Title';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import { Dropdown, Menu, Button } from 'antd';
import icons from 'dictionaries/icons';
import Router from 'next/router';
import PollFromDiscussionModal from 'components/WorkspaceInvitationModal/PollFromDiscussionModal';
import PollItem from 'components/PollItem/PollItem';
import PageSection from 'elements/PageSection/PageSection';

interface Props {
  discussion?: Discussion
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

  const onDestroyDiscussion = async (discussion: LightDiscussion) => {
    Router.push(
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).href,
      ROUTES.manage.workspace.discussions.index(discussion.workspace_id).as
    )
  }

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

  if (!discussion) {
    return <></>
  }

  const menu = (
    <Menu>
      {can(currentUser, 'discussion.edit', discussion) &&<Menu.Item key="edit-discussion">
        <Link {...ROUTES.manage.workspace.discussions.edit(discussion?.workspace_id, discussion?.slug)}><a>{t(('form.discussion.edit'))}</a></Link>
      </Menu.Item>}

      {can(currentUser, 'discussion.create-poll', discussion) && <Menu.Item key="poll-from-discussion">
        <PollFromDiscussionModal
          discussion={discussion}
          buttonElt={(onClick) => <a href="#" onClick={onClick}>{t('form.discussion.create-poll')}</a>}
        />
      </Menu.Item>}

      {can(currentUser, 'discussion.destroy', discussion) && <Menu.Item key="destroy-discussion">
        <a href="#" className="text-danger" onClick={() => onDestroyDiscussion(discussion)}>{t(('form.discussion.delete'))}</a>
      </Menu.Item>}

    </Menu>
  );

  return (
    <div className="Discussion">

      <header className="PageTitle discussion-margin">
        <Title level={"3"}>
          {discussion?.discussion_category && <DiscussionCategoryBadge size="large" text category={discussion?.discussion_category} />}
          {discussion?.name}
        </Title>
        <aside>
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.down}</span>
            </Button>
          </Dropdown>
        </aside>
      </header>

      {discussion.polls && discussion.polls.length > 0 && <PageSection title="Votes" type='boxed' className="discussion-margin">
        {discussion.polls.map(p => <PollItem poll={p} key={p.id} />)}
      </PageSection>}

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