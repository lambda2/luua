import React from 'react'
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';

const { Sider } = Layout;

interface Props {
}

const LeftMenu: React.FC<Props> = () => {

  const { pathname, query } = useRouter()
  const { t } = useLocale()

  // We try to guess the currently active page
  const active = `/${pathname && pathname.split('/')[1]}`

  return (<Sider className="site-layout-background" width={200}>
    <Menu
      mode="inline"
      selectedKeys={[active]}
      defaultOpenKeys={[]}
      style={{ height: '100%' }}
    >
      <Menu.Item key="/">
        <Link href="/"><a>{t('menu.summary')}</a></Link>g
      </Menu.Item>
{/* 
      <Menu.Item key="/manage/workspaces">
        <Link href="/manage/workspaces"><a>{t('menu.workspaces')}</a></Link>
      </Menu.Item>

      <Menu.Item key="/manage/missions">
        <Link href="/manage/missions"><a>{t('menu.missions')}</a></Link>
      </Menu.Item>

      <Menu.Item key="/orgs">
        <Link href="/orgs"><a>{t('menu.organizations')}</a></Link>
      </Menu.Item> */}

    </Menu>
  </Sider>)


}
export default LeftMenu
