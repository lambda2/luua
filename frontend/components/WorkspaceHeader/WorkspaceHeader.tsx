import React, { ReactElement, useContext } from 'react';
import { useLocale } from 'hooks/useLocale';
import manage, { ROUTES } from 'routes/routes';
import PrimaryLink from 'elements/PrimaryLink/PrimaryLink';
import PageTitle from 'elements/PageTitle/PageTitle';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import classNames from 'classnames';
import { Button, Menu, Dropdown } from 'antd';
import UserContext from 'contexts/UserContext';
import find from 'lodash/find';
import can from 'utils/can';
import WorkspaceJoinButton from '../WorkspaceJoinButton/WorkspaceJoinButton';
import icons from 'dictionaries/icons';
import Badge from 'elements/Badge/Badge';

type ResourceAction = 'show' | 'new' | 'edit' | 'destroy'

type ResourceButtons = {
  [key in ResourceAction]: ReactElement;
};

interface Props {
  workspace: Workspace
  tree?: (string | ReactElement)[]
  back?: boolean
  active?: string
  actions?: ResourceAction[]
}

const WorkspaceHeader = ({
  workspace,
  tree = [],
  back = false,
  active,
  actions = []
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
    new: <PrimaryLink key="new" {...manage.manage.workspace.new()}>{t('menu.new')}</PrimaryLink>,
    show: <PrimaryLink key="show" {...manage.manage.workspace.show(workspace.slug)}>{t('menu.show')}</PrimaryLink>,
    edit: <PrimaryLink key="edit" {...manage.manage.workspace.edit(workspace.slug)}>{t('menu.edit')}</PrimaryLink>,
    destroy: <PrimaryLink key="destroy" href="?">{t('menu.destroy')}</PrimaryLink>,
  }

  const onBack = back ? { onBack: () => window.history.back() } : {}
  const isAdmin = find(workspace.workspace_users, {admin: true, user_id: currentUser?.id})
  const isMember = isAdmin || find(workspace.workspace_users, {user_id: currentUser?.id})

  const addActions = () => {

    const menu = (
      <Menu>
        <Menu.Item key="add-mission">
          <Link {...manage.manage.workspace.missions.new(`${workspace.id}`)}><a>{t('mission.create.title')}</a></Link>
        </Menu.Item>
        <Menu.Item key="add-discussion">
          <Link {...manage.manage.workspace.discussions.new(`${workspace.id}`)}><a>{t('discussion.create.title')}</a></Link>
        </Menu.Item>
      </Menu>
    );

    return (<Dropdown key="dropdown" overlay={menu}>
      <Button type="link">
        {/* {icons.plus}
        {' '} */}
        <span className="text-light">{' '}{icons.plussquare}</span>
      </Button>
    </Dropdown>)
  }

  const renderGuestTabs = () => {
    return (<ul className="WorkspaceHeaderMenu">
      <li className={classNames({ active: active == 'summary' })} key="/">
        <Link {...ROUTES.manage.workspace.show(workspace.slug)}><a>{t('menu.summary')}</a></Link>
      </li>
      <li className={classNames({ active: active == 'discussions' })} key={`/explore/${workspace.id}/discussions`}>
        <Link {...ROUTES.manage.workspace.discussions.index(workspace.slug)}><a>{t('menu.discussions')}{' '}<Badge count={workspace.discussions_count} /></a></Link>
      </li>
      <li className={classNames({ active: active == 'votes' })} key={`/manage/${workspace.id}/votes`}>
        <Link {...ROUTES.manage.workspace.polls.index(workspace.id)}><a>{t('menu.votes')}{' '}{/* <Badge count={workspace.missions_count} /> */}</a></Link>
      </li>

      <li className={classNames({ active: active == 'missions' })} key={`/explore/${workspace.id}/missions`}>
        <Link {...ROUTES.manage.workspace.missions.index(workspace.slug)}><a>{t('menu.missions')}{' '}<Badge count={workspace.missions_count} /></a></Link>
      </li>
    </ul>)
  }

  const renderMemberTabs = () => {
    const pendingCandidates = (workspace?.mission_users || []).filter(mu => mu.status === 'applied')
    const activeContributors = (workspace?.mission_users || []).filter(mu => ['accepted', 'completed'].includes(mu.status))

    return (<ul className="WorkspaceHeaderMenu">
      <li className={classNames({ active: active == 'summary' })} key="/">
        <Link {...ROUTES.manage.workspace.show(workspace.id)}><a>{t('menu.summary')}</a></Link>
      </li>

      <li className={classNames({ active: active == 'discussions' })} key={`/manage/${workspace.id}/discussions`}>
        <Link {...ROUTES.manage.workspace.discussions.index(workspace.id)}><a>{t('menu.discussions')}{' '}<Badge count={workspace.discussions_count} /></a></Link>
      </li>

      <li className={classNames({ active: active == 'missions' })} key={`/manage/${workspace.id}/missions`}>
        <Link {...ROUTES.manage.workspace.missions.index(workspace.id)}><a>{t('menu.missions')}{' '}<Badge count={workspace.missions_count} /></a></Link>
      </li>

      <li className={classNames({ active: active == 'votes' })} key={`/manage/${workspace.id}/votes`}>
        <Link {...ROUTES.manage.workspace.polls.index(workspace.id)}><a>{t('menu.votes')}{' '}{/* <Badge count={workspace.missions_count} /> */}</a></Link>
      </li>

      <li className={classNames({ active: active == 'candidates' })} key={`/manage/${workspace.id}/candidates`}>
        <Link {...ROUTES.manage.workspace.candidates.index(workspace.id)}>
          <a>{t('menu.candidates')}{' '}<Badge count={pendingCandidates.length} /></a>
        </Link>
      </li>

      <li className={classNames({ active: active == 'contributors' })} key={`/manage/${workspace.id}/contributors`}>
        <Link {...ROUTES.manage.workspace.contributors.index(workspace.id)}>
          <a>{t('menu.contributors')}{' '}<Badge count={activeContributors.length} /></a>
        </Link>
      </li>

      {isAdmin && <li className={classNames({ active: active == 'settings' })} key={`/manage/${workspace.id}/edit`}>
        <Link {...ROUTES.manage.workspace.edit(workspace.slug)}>
          <a>{t('menu.settings')}</a>
        </Link>
      </li>}
    </ul>
    )
  }

  const leftActions = [
    <WorkspaceJoinButton key="workspace-join" workspace={workspace} user={currentUser}/>,
    (isMember) && addActions(),
    ...actions
      .filter((act) => can(currentUser, `workspace.${act}`, workspace))
      .map(a => buttons[a])
  ]
  return (
    <div className="WorkspaceHeader">
      <header className="WorkspaceHeaderContent">
        <PageTitle
          level='1'
          title={<>
            <UserAvatar name={workspace.name} size="default" src={workspace.image_url} />
            {' '}
            {tree.length > 0 ? <Link {...ROUTES.manage.workspace.show(workspace.slug)}>{workspace.name}</Link> : workspace.name }
            {tree.map(renderTree)}
          </>}
          extra={leftActions}
          {...onBack}
        >
        </PageTitle>
        {isMember && renderMemberTabs() || renderGuestTabs()}
      </header>
    </div>)
}

export default WorkspaceHeader
