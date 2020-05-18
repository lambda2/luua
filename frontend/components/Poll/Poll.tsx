import React, { useContext } from 'react';

import UserContext from 'contexts/UserContext';
import { destroy, vote } from 'api/poll';
import can from 'utils/can';
import { useLocale } from 'hooks/useLocale';
import Title from 'elements/Title/Title';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import { Dropdown, Menu, Button } from 'antd';
import icons from 'dictionaries/icons';
import Router from 'next/router';
import PollVoteOption from 'components/PollVoteOption/PollVoteOption';

interface Props {
  poll?: Poll
  messagesEndpoint: string | false | 0 | undefined
  votesEndpoint: string | false | 0 | undefined
  page?: number | string,
  token?: string
}

const Poll = ({
  poll}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const onDestroyPoll = async (poll: LightPoll) => {
    Router.push(
      ROUTES.manage.workspace.polls.index(poll.workspace_id).href,
      ROUTES.manage.workspace.polls.index(poll.workspace_id).as
    )
  }


  const onVote = async (voteOption: number) => {
    if (!poll?.id) {
      return false
    }
    await vote(poll?.id, voteOption, currentUser?.jwt || '')
    // await messagesResponse.refetch()
    // return await votesResponse?.refetch({ force: true })
  }


  if (!poll) {
    return <></>
  }

  const menu = (
    <Menu>
      {can(currentUser, 'poll.edit', poll) &&<Menu.Item key="edit-poll">
        <Link {...ROUTES.manage.workspace.polls.edit(poll?.workspace_id, poll?.slug)}><a>{t(('form.poll.edit'))}</a></Link>
      </Menu.Item>}

      {can(currentUser, 'poll.destroy', poll) && <Menu.Item key="destroy-poll">
        <a href="#" className="text-danger" onClick={() => onDestroyPoll(poll)}>{t(('form.poll.delete'))}</a>
      </Menu.Item>}
    </Menu>
  );

  return (
    <div className="Poll">

      <header className="PageTitle PollTitle">
        <Title level={"3"}>
          {poll?.discussion_category && <DiscussionCategoryBadge size="large" text category={poll?.discussion_category} />}
          {poll?.name}
        </Title>
        <aside>
          <Dropdown key="dropdown" overlay={menu}>
            <Button type="link">
              <span className="text-light">{' '}{icons.down}</span>
            </Button>
          </Dropdown>
        </aside>
      </header>

      <div>
        {poll.poll_options.map(po => <PollVoteOption
          poll={poll}
          voteOption={po}
          onVote={onVote}
        />)}
      </div>
    </div>
  )

}

export default Poll