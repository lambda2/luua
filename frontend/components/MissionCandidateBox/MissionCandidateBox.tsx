import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import MessageBox from 'elements/MessageBox/MessageBox';

const { users } = routes

interface Props {}


const MissionCandidateBox = ({}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()


  return (
    !currentUser && <>
      <MessageBox title={t('mission.candidate.notlogged.title')}>
        <div>
          <Link {...users.login()}><a>{t('mission.candidate.notlogged.login')}</a></Link>
          {' '}{t('generics.or')}{' '}
          <Link {...users.signup()}><a>{t('mission.candidate.notlogged.signup')}</a></Link>
          {' '}{t('mission.candidate.notlogged.to-apply')}
        </div>
      </MessageBox>
    </> || <></>
  )

}

export default MissionCandidateBox