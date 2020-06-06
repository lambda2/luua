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
import WorkspaceUserAvatar from 'elements/WorkspaceUserAvatar/WorkspaceUserAvatar';
import WorkspaceContext from 'contexts/WorkspaceContext';

interface Props extends VoteResults {
  poll: Poll
}

const PollVoteResultTable = ({
  poll,
  poll_options,
  user_votes
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()
  
  const myVote = user_votes && user_votes.find(e => e.user.id == currentUser?.id)
  const maxVote = max(poll_options.map(e => e.vote_count || 0))
  const totalVote = sumBy(poll_options, 'vote_count')

  const wuFromUv = (uv: LightUserVote) => {
    return currentWorkspace?.workspace_users.find((wu) => uv.user?.id === wu.user_id) || { user: uv }
  }
  const renderVoteResult = (voteOption: PollOption, votes: LightUserVote[]) => {
    const isMajority = maxVote === voteOption.vote_count
    const percent = Math.round(((voteOption.vote_count || 0) * 100) / (totalVote || 1))
    console.log("Is majority ? ", { maxVote, current: voteOption.vote_count, votes });
    
    return (
      <tr key={voteOption.id}>
        <td className={classNames("PollVoteResultTableElement Name", { majority: isMajority })}>
            {voteOption.name}
        </td>
        <td className={classNames("PollVoteResultTableElement Percent", { majority: isMajority })} key={voteOption.id}>
          <progress max={100} value={percent}></progress>
        </td>
        <td className={classNames("PollVoteResultTableElement Percent", { majority: isMajority })} key={voteOption.id}>
          <span>{percent}%</span>
        </td>
        <td className={classNames("PollVoteResultTableElement Percent", { majority: isMajority })} key={voteOption.id}>
            {votes.map(uv => <WorkspaceUserAvatar key={uv.id} size="small" {...wuFromUv(uv) as WorkspaceUser} />)}
        </td>
      </tr>
    )
  }

  const results = poll_options.map(e => {
    return {
      voteOption: e,
      votes: user_votes && user_votes.filter(uv => uv.poll_option_id === e.id)
    }
  })

  return <table className="PollVoteResultTable">
      {results.map(({ voteOption, votes }) => {
        return renderVoteResult(voteOption, votes)
      })}
    </table>

}

export default PollVoteResultTable