
import React, { useContext } from 'react'

import UserContext from '../../contexts/UserContext'

import LangSelect from '../LangSelect/LangSelect';
import UserMenuDropdown from '../UserMenuDropdown/UserMenuDropdown';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
const { manage, explore } = routes


interface Props {}

const WorkspaceMenu: React.FC<Props> = () => {
  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  const activeWorkspace = currentUser?.workspaces[0]

  return (<header className="WorkspaceMenu">
    <div className="logo" />
    <ul className="main-header-menu">
      <li key="/explore">
        <Link {...explore.index()}><a>{t('menu.explore')}</a></Link>
      </li>
      <li key="/manage">
        {activeWorkspace ?
          <Link {...manage.workspace.show(activeWorkspace.slug)}><a>{t('menu.manage')}</a></Link> :
          <Link {...manage.index()}><a>{t('menu.manage')}</a></Link>
        }
      </li>
      <li className="pusher"></li>
      <li key="/user">
        <UserMenuDropdown user={currentUser} />
      </li>
    </ul>
  </header>)
}

WorkspaceMenu.displayName = 'WorkspaceMenu'

export default WorkspaceMenu;













