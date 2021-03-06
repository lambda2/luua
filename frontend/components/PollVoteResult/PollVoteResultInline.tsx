import React, { useContext } from 'react';


import { useLocale } from 'hooks/useLocale';
import Title from 'elements/Title/Title';
import { Button } from 'antd';
import UserContext from 'contexts/UserContext';
import find from 'lodash/find';
import UserAvatarTooltip from 'elements/UserAvatarTooltip/UserAvatarTooltip';
import maxBy from 'lodash/maxBy';
import classNames from 'classnames';
import { max } from 'lodash';
import sumBy from 'lodash/sumBy';

interface Props extends VoteResults {
  poll: Poll
}

const PollVoteResultInline = ({
  poll,
  poll_options,
  user_votes
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  
  const myVote = user_votes && user_votes.find(e => e.user.id == currentUser?.id)
  const maxVote = max(poll_options.map(e => e.vote_count || 0))
  const totalVote = sumBy(poll_options, 'vote_count')

  const renderVoteResult = (voteOption: PollOption, votes: LightUserVote[]) => {
    const isMajority = maxVote === voteOption.vote_count
    const percent = Math.round(((voteOption.vote_count || 0) * 100) / (totalVote || 1))
    console.log("Is majority ? ", { maxVote, current: voteOption.vote_count, votes });
    
    if (percent == 0) {
      return <></>
    }
    return (
      <div style={{width: `${percent}%`}} className={classNames("PollVoteResultInlineElement", { majority: isMajority })} key={voteOption.id}>
        <main>{percent}%</main>
        <aside>
          {voteOption.name}
          {/* {votes && votes.length > 0 ? 
            votes.map(u => <UserAvatarTooltip key={u.id} text={false} image {...u.user} />) :
            <span>{voteOption.vote_count} votes</span>
          } */}
        </aside>
      </div>
    )
  }

  const results = poll_options.map(e => {
    return {
      voteOption: e,
      votes: user_votes && user_votes.filter(uv => uv.poll_option_id === e.id)
    }
  })

  return <div className="PollVoteResultInline">
    {results.map(({ voteOption, votes }) => {
      return renderVoteResult(voteOption, votes)
    })}
  </div>

}

export default PollVoteResultInline