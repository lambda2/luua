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



const WorkspaceSettingsMenu: React.FC<Props> = () => {

  const { t } = useLocale()
  const { pathname, query } = useRouter()
  const { workspaces, currentWorkspace, changeWorkspace } = useContext(WorkspaceContext)

  const workspace_id = query.workspace_id && query.workspace_id.toString()

  return (<ul className="WorkspaceSettingsMenu">


      {workspace_id && <li key="/edit">
        <Link {...workspace.edit(workspace_id)}><a>{t('workspace.settings.edit')}</a></Link>
      </li>}

      {workspace_id && <li key="/members">
        <Link {...workspace.members(workspace_id)}><a>{t('workspace.settings.members')}</a></Link>
      </li>}

  </ul>)


}
export default WorkspaceSettingsMenu
