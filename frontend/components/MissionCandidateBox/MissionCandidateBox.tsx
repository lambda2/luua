import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
// import './MissionCandidateBox.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';

const { users } = routes

interface Props {}

const MessageBox: React.FC<{title: string}> = ({
  title,
  children
}) => {
  return <div className="message-box">
    <h3>{title}</h3>
    {children}
  </div>
}

const MissionCandidateBox = ({}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()


  return (
    !currentUser && <div className="MissionCandidateBox">
      <MessageBox title={t('mission.candidate.notlogged.title')}>
        <div>
          <Link {...users.login()}><a>{t('mission.candidate.notlogged.login')}</a></Link>
          {' '}{t('generics.or')}{' '}
          <Link {...users.signup()}><a>{t('mission.candidate.notlogged.signup')}</a></Link>
          {' '}{t('mission.candidate.notlogged.to-apply')}
        </div>
      </MessageBox>
    </div> || <></>
  )

}

export default MissionCandidateBox