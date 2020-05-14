import React, { ReactElement, useContext } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { ROUTES } from '../../routes/routes';
import PageTitle from '../../elements/PageTitle/PageTitle';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import classNames from 'classnames';
import UserContext from '../../contexts/UserContext';
import { nameForUser } from '../../utils/user';

interface Props {
  user: User
  extras?: (string | ReactElement)[]
  active?: string
}

const UserHeader = ({
  user,
  active,
  extras = []
}: Props) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  const renderTree = (elt: string | ReactElement) => {
    return <>
      <span style={{padding: '0 5px', color: '#ccc'}}>{' / '}</span>
      {elt}
    </>
  }


  const isMyself = currentUser?.id === user.id

  const renderGuestTabs = () => {
    return (<ul className="UserHeaderMenu">
      <li className={classNames({ active: active == 'summary' })} key="/">
        <Link {...ROUTES.users.show(user.username)}><a>{t('menu.summary')}</a></Link>
      </li>
      {/* <li className={classNames({ active: active == 'missions' })} key={`/explore/${workspace.id}/missions`}>
        <Link {...ROUTES.manage.workspace.missions.index(workspace.slug)}><a>{t('menu.missions')}</a></Link>
      </li> */}
    </ul>)
  }

  const renderMyselfTabs = () => {

    return (<ul className="UserHeaderMenu">
      <li className={classNames({ active: active == 'summary' })} key="/profile">
        <Link {...ROUTES.users.profile()}><a>{t('menu.summary')}</a></Link>
      </li>
      {/* <li className={classNames({ active: active == 'skills' })} key="/profile/skills">
        <Link {...ROUTES.users.skills()}><a>{t('menu.skills')}</a></Link>
      </li> */}
      <li className={classNames({ active: active == 'notifications' })} key="/profile/notifications">
        <Link {...ROUTES.users.notifications()}><a>{t('menu.notifications')}</a></Link>
      </li>
      <li className="pusher"></li>

      <li className={classNames({ active: active == 'edit' })} key="/profile/edit">
        <Link {...ROUTES.users.edit()}><a>{t('menu.settings')}</a></Link>
      </li>

    </ul>
    )
  }

  return (
    <div className="UserHeader">
      <header className="UserHeaderContent">
        <PageTitle
          level='1'
          title={<>
            <UserAvatar name={user.username} size="large" src={user.image_url} />
            {' '}
            {user && nameForUser({ username: user.username, first_name: user.first_name, last_name: user.last_name })}
          </>}
          extra={extras}
        >
        </PageTitle>
        {isMyself && renderMyselfTabs() || renderGuestTabs()}
      </header>
    </div>)
}

export default UserHeader
