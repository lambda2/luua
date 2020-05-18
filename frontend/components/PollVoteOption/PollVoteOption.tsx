import React from 'react';


import { useLocale } from 'hooks/useLocale';
import Title from 'elements/Title/Title';
import { Button } from 'antd';

interface Props {
  poll?: Poll
  voteOption: PollOption
  onVote: (id: number) => void
  userVote?: any
}

const PollVoteOption = ({
  voteOption,
  onVote,
  userVote
}: Props) => {

  const { t } = useLocale()

  return (
    <div className="PollVoteOption" key={voteOption.id}>
      <main>
      <Title level={"4"}>
        {voteOption.name}
      </Title>
      {voteOption.description && <p>{voteOption.description}</p>}
      </main>
      <aside>
        {!userVote && <Button onClick={() => onVote(voteOption.id)}>{t('polls.actions.vote')}</Button>}
        {userVote && <Button disabled>{t('polls.actions.already-voted')}</Button>}
      </aside>
    </div>
  )

}

export default PollVoteOption