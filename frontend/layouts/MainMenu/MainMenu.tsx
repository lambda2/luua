
import React, { useContext } from 'react'

import UserContext from '../../contexts/UserContext'

import { Layout, Menu } from 'antd';
// import './MainMenu.less'
import LangSelect from '../../elements/LangSelect/LangSelect';
import UserMenuDropdown from '../../elements/UserMenuDropdown/UserMenuDropdown';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
const { manage, explore } = routes

const { Header } = Layout;


interface Props {}

const MainMenu: React.FC<Props> = () => {
  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  const activeWorkspace = currentUser?.workspaces[0]

  return (<Header className="main-header">
    <div className="logo" />
    <Menu className="main-header-menu" theme="light" mode="horizontal">
      <Menu.Item key="/explore">
        <Link {...explore.index()}><a>{t('menu.explore')}</a></Link>
      </Menu.Item>
      <Menu.Item key="/manage">
        {activeWorkspace ?
          <Link {...manage.workspace.show(activeWorkspace.slug)}><a>{t('menu.manage')}</a></Link> :
          <Link {...manage.index()}><a>{t('menu.manage')}</a></Link>
        }
      </Menu.Item>
      <li className="pusher"></li>
      <Menu.Item key="/user">
        <UserMenuDropdown user={currentUser} />
      </Menu.Item>
    </Menu>
  </Header>)
}

MainMenu.displayName = 'MainMenu'

export default MainMenu;













