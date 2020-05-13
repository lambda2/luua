import React, { ReactElement, useContext } from 'react';
import { useLocale } from '../../hooks/useLocale';
import manage, { ROUTES } from '../../routes/routes';
import PrimaryLink from '../../elements/PrimaryLink/PrimaryLink';
import PageTitle from '../../elements/PageTitle/PageTitle';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import classNames from 'classnames';
import UserContext from '../../contexts/UserContext';
import find from 'lodash/find';
import can from '../../utils/can';

type ResourceAction = 'show' | 'new' | 'edit' | 'destroy'

type ResourceButtons = {
  [key in ResourceAction]: ReactElement;
};

interface Props {
  workspace: Workspace
  mission: BaseMission
  tree?: (string | ReactElement)[]
  active?: string
  actions?: ResourceAction[]
}

const MissionHeader = ({
  workspace,
  mission,
  tree = [],
  active,
  actions = ['edit']
}: Props) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  const renderTree = (elt: string | ReactElement) => {
    return <>
      <span style={{padding: '0 5px', color: '#ccc'}}>{' / '}</span>
      {elt}
    </>
  }

  const buttons: ResourceButtons = {
    new: <PrimaryLink key="new" {...manage.manage.workspace.missions.new(workspace.slug)}>{t('menu.new')}</PrimaryLink>,
    show: <PrimaryLink key="show" {...manage.manage.workspace.missions.show(workspace.slug, mission.slug)}>{t('menu.show')}</PrimaryLink>,
    edit: <PrimaryLink key="edit" {...manage.manage.workspace.missions.edit(workspace.slug, mission.slug)}>{t('menu.edit')}</PrimaryLink>,
    destroy: <PrimaryLink key="destroy" href="?">{t('menu.destroy')}</PrimaryLink>,
  }

  const isAdmin = find(workspace.workspace_users, {admin: true, user_id: currentUser?.id})
  const isMember = isAdmin || find(workspace.workspace_users, {user_id: currentUser?.id})

  const renderGuestTabs = () => {
    return (<ul className="MissionHeaderMenu">
      <li className={classNames({ active: active == 'summary' })} key="/summary">
        <Link {...ROUTES.manage.workspace.missions.show(workspace.slug, mission.slug)}><a>{t('mission.summary')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'discussion' })} key="/chat">
        <Link {...ROUTES.manage.workspace.missions.discussion(workspace.slug, mission.slug)}><a>{t('mission.chat')}</a></Link>
      </li>
    </ul>)
  }

  const renderMemberTabs = () => {
    const pendingCandidates = (workspace?.mission_users || []).filter(mu => mu.status === 'applied')
    const activeContributors = (workspace?.mission_users || []).filter(mu => ['accepted', 'completed'].includes(mu.status))

    return (<ul className="MissionHeaderMenu">

      <li className={classNames({ active: active == 'summary' })} key="/summary">
        <Link {...ROUTES.manage.workspace.missions.show(workspace.slug, mission.slug)}><a>{t('mission.summary')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'discussion' })} key="/chat">
        <Link {...ROUTES.manage.workspace.missions.discussion(workspace.slug, mission.slug)}><a>{t('mission.chat')}</a></Link>
      </li>

      {isAdmin && <li className={classNames({ active: active == 'settings' })} key={`/manage/${workspace.id}/edit`}>
        <Link {...ROUTES.manage.workspace.missions.edit(workspace.slug, mission.slug)}>
          <a>{t('menu.settings')}</a>
        </Link>
      </li>}
    </ul>
    )
  }

  const leftActions = [
    // <WorkspaceJoinButton key="workspace-join" workspace={workspace} user={currentUser}/>,
    ...actions
      .filter((act) => can(currentUser, `workspace.${act}`, workspace))
      .map(a => buttons[a])
  ]
  return (
    <div className="MissionHeader">
      <header className="MissionHeaderContent">

        <PageTitle
          level='1'
          title={<>
            <div className="sup-title">
              <UserAvatar name={workspace.name} size="small" src={workspace.image_url} />
              <Link key="show" {...ROUTES.manage.workspace.show(workspace.slug)}><a>{workspace.name}</a></Link>
              <span className="separator">/</span>
              <Link key="missions" {...ROUTES.manage.workspace.missions.index(workspace.slug)}><a>{t('menu.missions')}</a></Link>
            </div>

            {tree.length > 0 ? <Link {...ROUTES.manage.workspace.missions.show(workspace.slug, mission.slug)}><a>{mission.name}</a></Link> : mission.name }
            {tree.map(renderTree)}
          </>}
          extra={leftActions}
        >
        </PageTitle>
        {isMember && renderMemberTabs() || renderGuestTabs()}
      </header>
    </div>)
}

export default MissionHeader
