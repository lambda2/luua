
import React, { useContext } from 'react'

import UserContext from '../../contexts/UserContext'
import UserMenuDropdown from '../../elements/UserMenuDropdown/UserMenuDropdown';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
const { manage, explore } = routes


interface Props {}

const MainMenu: React.FC<Props> = () => {
  const { currentUser, notifications } = useContext(UserContext)
  const { t } = useLocale()
  const activeWorkspace = currentUser?.workspaces[0]
  const multipleWorkspaces = (currentUser?.workspaces?.length || 0) > 1

  return (<header className="MainMenu">
    <div className="logo" />
    <ul className="main-header-menu">
      <li key="/explore">
        <Link {...explore.index()}><a>{t('menu.explore')}</a></Link>
      </li>

      {currentUser && activeWorkspace && <li key="/manage">
        {multipleWorkspaces ?
          <Link {...manage.workspace.index()}><a>{t('menu.manage')}</a></Link> :
          <Link {...manage.workspace.show(activeWorkspace.slug)}><a>{activeWorkspace.name}</a></Link>
        }
      </li>}
      {currentUser && !activeWorkspace && <li key="/manage">
        <Link {...manage.index()}><a>{t('menu.manage')}</a></Link>
      </li>}

      <li className="pusher"></li>
      
      <li key="/user">
        <UserMenuDropdown notifications={notifications} user={currentUser} />
      </li>
    </ul>
  </header>)
}

MainMenu.displayName = 'MainMenu'

export default MainMenu;













