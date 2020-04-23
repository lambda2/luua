import React, { useContext } from 'react'
// import Link from "next/link"
import { Layout, Menu, Dropdown, message, Badge } from 'antd';
import Router, { useRouter } from 'next/router'
import WorkspaceContext from '../../contexts/WorkspaceContext';
import WorkspaceLabel from '../../elements/WorkspaceLabel/WorkspaceLabel';
import { ClickParam } from 'antd/lib/menu';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';

const { Sider } = Layout;
const { manage } = routes
const { workspace, index } = manage

interface Props {
}



const ManageLeftMenu: React.FC<Props> = () => {

  const { t } = useLocale()
  const { pathname, query } = useRouter()
  const { workspaces, currentWorkspace, changeWorkspace } = useContext(WorkspaceContext)
  
  // We try to guess the currently active page
  const active = `/${pathname && pathname.split('/')[1]}`
  const workspace_id = query.workspace_id && query.workspace_id.toString()

  const pendingCandidates = (currentWorkspace?.mission_users || []).filter(mu => mu.status === 'applied')
  const activeContributors = (currentWorkspace?.mission_users || []).filter(mu => ['accepted', 'completed'].includes(mu.status))

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Router.push(`/manage/${workspace_id}`)
  }

  const handleMenuClick = (e: ClickParam) => {
    message.info(t('switching-workspace'));
    changeWorkspace(e.key)
    Router.push(`/manage/${e.key}`)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {workspaces.map(w => <Menu.Item key={w.slug}>
          <WorkspaceLabel {...w} />
        </Menu.Item>
      )}
    </Menu>
  );

  return (<Sider className="site-layout-background" width={200}>

    <Menu
      mode="inline"
      selectable={false}
      selectedKeys={[active]}
      defaultOpenKeys={[]}
      style={{ height: '100%' }}
    >
      {currentWorkspace && 
        <Dropdown.Button className="ws-dropdown-button" onClick={handleButtonClick} overlay={menu}>
          <WorkspaceLabel {...currentWorkspace} />
        </Dropdown.Button>
      }

      <Menu.Item key="/">
        <Link {...index()}><a>{t('menu.summary')}</a></Link>
      </Menu.Item>

      {/* <Menu.Item key="/manage/workspaces">
        <Link {...workspace.index()}><a>{t('menu.workspaces')}</a></Link>
      </Menu.Item> */}

      {workspace_id && <Menu.Item key={`/manage/${workspace_id}/missions`}>
        <Link {...workspace.missions.index(workspace_id) }><a>{t('menu.missions')}</a></Link>
      </Menu.Item>}

      {workspace_id && <Menu.Item key={`/manage/${workspace_id}/candidates`}>
        <Link {...workspace.candidates.index(workspace_id) }>
          <a>{t('menu.candidates')}<Badge count={pendingCandidates.length} /></a>
        </Link>
      </Menu.Item>}

      {workspace_id && <Menu.Item key={`/manage/${workspace_id}/contributors`}>
        <Link {...workspace.contributors.index(workspace_id) }>
          <a>{t('menu.contributors')}<Badge count={activeContributors.length} /></a>
        </Link>
      </Menu.Item>}

      {/* <Menu.Item key="/orgs">
        <Link href="/orgs"><a>{t('menu.organizations')}</a></Link>
      </Menu.Item> */}

    </Menu>
  </Sider>)


}
export default ManageLeftMenu
