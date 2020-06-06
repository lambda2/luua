import React, { useContext } from 'react';

import UserContext from 'contexts/UserContext';
import { destroy, vote, close } from 'api/poll';
import can from 'utils/can';
import { useLocale } from 'hooks/useLocale';
import ROUTES from 'routes/routes';
import { Dropdown, Menu, Button } from 'antd';
import Router from 'next/router';
import PollVoteOption from 'components/PollVoteOption/PollVoteOption';
import { useCollection } from 'utils/http';
import PageSection from 'elements/PageSection/PageSection';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import PollVoteResultInline from 'components/PollVoteResult/PollVoteResultInline';
import icons from 'dictionaries/icons';
import momentWithLocale from 'i18n/moment';
import PollVoteResultTable from 'components/PollVoteResult/PollVoteResultTable';
import { queryCache } from 'react-query';

interface Props {
  poll: EmbedPoll
  token?: string
}

const PollEmbed = ({
  poll,
  token
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  if (!poll) {
    return <></>
  }

  // @TODO this hits the browser cache each time the user is voting
  const votesResponse = useCollection<UserVote[]>(
    (currentUser !== null) && `/api/polls/${poll?.id}/user_votes/mines`, (token || currentUser?.jwt)
  )

  // @TODO this hits the browser cache each time the user is voting
  const resultResponse = useCollection<VoteResults>(
    can(currentUser, 'poll.results', poll) && `/api/polls/${poll?.id}/results`, (token || currentUser?.jwt)
  )
  
  const onVote = async (poll_option_id: number) => {
    if (!poll?.id) {
      return false
    }
    await vote(poll?.id, poll_option_id, token || currentUser?.jwt || '')
    await votesResponse.refetch()
    return await resultResponse?.refetch({ force: true })
  }

  const onClose = async () => {
    if (!poll?.id) {
      return false
    }
    await close(poll?.id, token || currentUser?.jwt || '')
    await votesResponse.refetch()
    queryCache.refetchQueries(['messages', { discussion_id: poll.discussion_id }])
    return await resultResponse?.refetch({ force: true })
  }
  
  const userDidVote = poll.user_votes.find(v => v.user.id === currentUser?.id) || votesResponse.data && votesResponse.data.length > 0
  const isClosed = poll.closed_at !== null && resultResponse?.data ? true : false
  const isDraft = poll.visibility === 'draft'
  const areResultsVisible = poll.reveal == 'always' ||
                            (poll.reveal == 'on_vote' && userDidVote) ||
                            (poll.reveal == 'on_close' && isClosed)

  return (
    <div className="Poll PollEmbed">

      <div className="PollTitle">
        <b>{poll?.name}</b>
      </div>

      {poll.description && <MarkdownContent content={poll.description} />}

      {/* Show the vote options */}
      {!userDidVote && !isDraft && !isClosed && <div className="LightVoteOptionList">
        {poll.poll_options.map(po => <PollVoteOption
          poll={poll}
          userVote={votesResponse.data}
          voteOption={po}
          light={true}
          key={po.id}
          onVote={onVote}
        />)}
        </div>}

      {/* Show the vote results */}
      {areResultsVisible && resultResponse.data && resultResponse.data.user_votes.length > 0 && <div>
        <PollVoteResultTable poll={poll} {...resultResponse!.data as VoteResults} />
      </div>}

      {/* Buttons to close the poll if available */}
      {can(currentUser, 'poll.close', poll) && poll.closed_at === null && <PageSection>
        <Button className="text-danger" onClick={onClose}>{t('poll.actions.close')}</Button>
      </PageSection>}

      <footer className="text-light">
        {/* {poll.user_votes && <li className="count">{icons.poll.closed} {t('poll.votes_count', { count: poll.user_votes.length})}</li>} */}
        {poll.begin_at && moment().isBefore(poll.begin_at) && <li className="begin-at">{icons.date} {t('poll.starts')} {moment(poll.begin_at).calendar().toLowerCase()}</li>}
        {!isClosed && poll.end_at && <li className="end-at">{icons.date} {t('poll.ends')} {moment(poll.end_at).calendar().toLowerCase()}</li>}
        {poll.closed_at && <li className="end-at">{icons.date} {t('poll.ended')} {moment(poll.closed_at).calendar().toLowerCase()}</li>}
      </footer>
      
    </div>
  )

}

export default PollEmbed