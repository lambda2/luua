import React, { ReactElement, useContext } from 'react';
import { useLocale } from 'hooks/useLocale';
import { ROUTES } from 'routes/routes';
import PageTitle from 'elements/PageTitle/PageTitle';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import UserContext from 'contexts/UserContext';
import { nameForUser } from 'utils/user';
import { Tabs, Tab, TabSpacer } from 'elements/TabMenu/TabMenu';

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

  const isMyself = currentUser && user && currentUser?.id === user.id

  const renderGuestTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary"><Link {...ROUTES.users.profile()}><a>{t('menu.summary')}</a></Link></Tab>
    </Tabs>
  }

  const renderMyselfTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary"><Link {...ROUTES.users.profile()}><a>{t('menu.summary')}</a></Link></Tab>
      <Tab active={active} name="notifications"><Link {...ROUTES.users.notifications()}><a>{t('menu.notifications')}</a></Link></Tab>
      <TabSpacer />
      <Tab active={active} name="edit"><Link {...ROUTES.users.edit()}><a>{t('menu.settings')}</a></Link></Tab>
    </Tabs>
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
