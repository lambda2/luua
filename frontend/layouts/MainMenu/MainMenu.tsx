
import React, { useContext } from 'react'

import UserContext from 'contexts/UserContext'
import UserMenuDropdown from 'elements/UserMenuDropdown/UserMenuDropdown';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import WorkspaceContext from 'contexts/WorkspaceContext';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import icons from 'dictionaries/icons';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
const { manage, explore } = routes


interface Props {}

const MainMenu: React.FC<Props> = () => {
  const { currentUser, notifications } = useContext(UserContext)
  const { currentWorkspace } = useContext(WorkspaceContext)
  const { t } = useLocale()

  const workspacesMenu = (
    <Menu>
      {currentUser?.workspaces.filter(w => w.id !== currentWorkspace?.id).map(w => <Menu.Item key={w.id}>
        <Link {...manage.workspace.show(w.slug)}><a>
          <UserAvatar size="xsmall" name={w?.name || ''} src={w?.thumb_url} />
          {' '}
          {w.name}
        </a></Link>
      </Menu.Item>)}
      <Menu.Item key='new'>
        <Link {...routes.manage.workspace.new()}><a>{t('workspace.no-workspace-yet.create-now')}</a></Link>
      </Menu.Item>
    </Menu>
  );

  return (<header className="MainMenu">
    <div className="logo" />
    <ul className="main-header-menu">
      <li key="/">
        <Link {...routes.index()}><a>{t('menu.home')}</a></Link>
      </li>
      <li key="/explore">
        <Link {...explore.index()}><a>{t('menu.explore')}</a></Link>
      </li>

      {currentUser && currentWorkspace && <li key="/manage">
        <Link {...manage.workspace.show(currentWorkspace.slug)}>
          <a>
            <UserAvatar size="xsmall" name={currentWorkspace?.name || ''} src={currentWorkspace?.thumb_url} />
            <span>{currentWorkspace.name}</span>
          </a>
        </Link>
        {' '}
        <Dropdown overlay={workspacesMenu}>
          <span>{' '}{icons.down}</span>
        </Dropdown>
      </li>}

      {currentUser && currentUser?.workspaces?.length === 0 && <li key="/manage">
        <Link {...manage.index()}><a>{t('menu.no-workspace')}</a></Link>
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













