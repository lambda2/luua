import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import WorkspaceContext from 'contexts/WorkspaceContext';
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import classNames from 'classnames';

const { manage } = routes
const { workspace } = manage

interface Props {
  active?: string
}

const WorkspaceSettingsMenu = ({
  active
}: Props) => {

  const { t } = useLocale()
  const { pathname, query } = useRouter()
  const { workspaces, currentWorkspace, changeWorkspace } = useContext(WorkspaceContext)

  const workspace_id = query.workspace_id && query.workspace_id.toString()

  if (!workspace_id) {
    return <></>
  }

  return (<ul className="WorkspaceSettingsMenu">


      <li className={classNames({ active: active == 'edit' })} key="/edit">
        <Link {...workspace.edit(workspace_id)}><a>{t('workspace.settings.edit')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'members' })} key="/members">
        <Link {...workspace.members(workspace_id)}><a>{t('workspace.settings.members')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'invitations' })} key="/invitations">
        <Link {...workspace.invitations(workspace_id)}><a>{t('workspace.settings.invitations')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'categories' })} key="/categories">
        <Link {...workspace.categories(workspace_id)}><a>{t('workspace.settings.categories')}</a></Link>
      </li>

      {/* @TODO show workspace requests */}
      {/* <li className={classNames({ active: active == 'requests' })} key="/requests">
        <Link {...workspace.requests(workspace_id)}><a>{t('workspace.settings.requests')}</a></Link>
      </li> */}

  </ul>)


}
export default WorkspaceSettingsMenu
