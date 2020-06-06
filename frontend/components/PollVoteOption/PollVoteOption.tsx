import React from 'react';


import { useLocale } from 'hooks/useLocale';
import Title from 'elements/Title/Title';
import { Button } from 'antd';

interface Props {
  poll?: Poll
  voteOption: PollOption
  onVote: (poll_option_id: number) => void
  light?: boolean
  userVote?: UserVote[]
}

const PollVoteOption = ({
  voteOption,
  onVote,
  light = false,
  userVote
}: Props) => {

  const { t } = useLocale()
  const voted = userVote?.length && userVote?.length > 0 || false
  const vote = userVote?.find(e => e.poll_option.id === voteOption.id)

  if (light) {
    return (<div  className="LightVoteOption">
      { !userVote && <Button loading>{t('network.loading')}</Button> }
      {userVote && !voted && <Button onClick={() => onVote(voteOption.id)}>{voteOption.name}</Button> }
      { voted && <Button disabled>{t('poll.actions.already-voted')}</Button> }
    </div>)
  }

  return (
    <div className="PollVoteOption" key={voteOption.id}>
      <main>
        <Title level={"4"}>
          {voteOption.name}
        </Title>
        {voteOption.description && <p>{voteOption.description}</p>}
      </main>
      <aside>
        {!userVote && <Button loading>{t('network.loading')}</Button>}
        {userVote && !voted && <Button onClick={() => onVote(voteOption.id)}>{t('poll.actions.vote-name', {name: voteOption.name})}</Button>}
        {voted && <Button disabled>{t('poll.actions.already-voted')}</Button>}
      </aside>
    </div>
  )

}

export default PollVoteOption