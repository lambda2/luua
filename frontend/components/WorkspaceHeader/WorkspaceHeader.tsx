import React, { ReactElement, useContext, memo } from 'react';
import { useLocale } from 'hooks/useLocale';
import manage, { ROUTES } from 'routes/routes';
import PrimaryLink from 'elements/PrimaryLink/PrimaryLink';
import PageTitle from 'elements/PageTitle/PageTitle';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import { Button, Menu, Dropdown } from 'antd';
import UserContext from 'contexts/UserContext';
import find from 'lodash/find';
import can from 'utils/can';
import WorkspaceJoinButton from '../WorkspaceJoinButton/WorkspaceJoinButton';
import Badge from 'elements/Badge/Badge';
import Tag from 'elements/Tag/Tag';
import { Tabs, Tab, TabSpacer } from 'elements/TabMenu/TabMenu';

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

interface TabsProps {
  slug: string
  isAdmin?: boolean
  isMember?: boolean
  active?: string
  discussions_count?: number
  polls_count?: number
  missions_count?: number
}
interface TitleProps {
  name: string
  image_url?: string
  isAdmin?: boolean
  isMember?: boolean
  slug: string
  tree?: (string | ReactElement)[]
}

const WorkspaceTitle = memo(({
  name,
  image_url,
  isAdmin,
  slug,
  tree = [],
  isMember,
}: TitleProps) => {

  const { t } = useLocale()

  const renderTree = (elt: string | ReactElement) => {
    return <>
      <span style={{ padding: '0 5px', color: '#ccc' }}>{' / '}</span>
      {elt}
    </>
  }
  return (<>
    <UserAvatar name={name} size="default" src={image_url} />
    {' '}
    {tree.length > 0 ? <Link {...ROUTES.manage.workspace.show(slug)}>{name}</Link> : name}
    {' '}
    {isMember && <Tag className={`tag-${isAdmin ? 'admin' : 'member'}`}>{isAdmin ? t('generics.admin') : t('generics.member')}</Tag>}
    {tree.map(renderTree)}
  </>)

})

const WorkspaceTabs = memo(({
  slug,
  active,
  isAdmin,
  isMember,
  discussions_count = 0,
  polls_count = 0,
  missions_count = 0,
}: TabsProps) => {

  const { t } = useLocale()

  const renderGuestTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary">
        <Link {...ROUTES.manage.workspace.show(slug)}><a>{t('menu.summary')}</a></Link>
      </Tab>
      <Tab active={active} name="discussions">
        <Link {...ROUTES.manage.workspace.discussions.index(slug)}><a>{t('menu.discussions')}{' '}<Badge count={discussions_count} /></a></Link>
      </Tab>
      <Tab active={active} name="votes">
        <Link {...ROUTES.manage.workspace.polls.index(slug)}><a>{t('menu.votes')}{' '}{<Badge count={polls_count} />}</a></Link>
      </Tab>
      <Tab active={active} name="missions">
        <Link {...ROUTES.manage.workspace.missions.index(slug)}><a>{t('menu.missions')}{' '}<Badge count={missions_count} /></a></Link>
      </Tab>
    </Tabs>
  }

  const renderMemberTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary">
        <Link {...ROUTES.manage.workspace.show(slug)}><a>{t('menu.summary')}</a></Link>
      </Tab>
      <Tab active={active} name="discussions">
        <Link {...ROUTES.manage.workspace.discussions.index(slug)}><a>{t('menu.discussions')}{' '}<Badge count={discussions_count} /></a></Link>
      </Tab>
      <Tab active={active} name="votes">
        <Link {...ROUTES.manage.workspace.polls.index(slug)}><a>{t('menu.votes')}{' '}{<Badge count={polls_count} />}</a></Link>
      </Tab>
      <Tab active={active} name="missions">
        <Link {...ROUTES.manage.workspace.missions.index(slug)}><a>{t('menu.missions')}{' '}<Badge count={missions_count} /></a></Link>
      </Tab>
      {/* <Tab active={active} name="candidates">
        <Link {...ROUTES.manage.workspace.candidates.index(workspace.slug)}>
          <a>{t('menu.candidates')}{' '}<Badge count={pendingCandidates.length} /></a>
        </Link>
      </Tab>
      <Tab active={active} name="contributors">
        <Link {...ROUTES.manage.workspace.contributors.index(workspace.slug)}>
          <a>{t('menu.contributors')}{' '}<Badge count={activeContributors.length} /></a>
        </Link>
      </Tab> */}
      <TabSpacer />
      {isAdmin && <Tab active={active} name="settings">
        <Link {...ROUTES.manage.workspace.edit(slug)}>
          <a>{t('menu.settings')}</a>
        </Link>
      </Tab> || <></>}
    </Tabs>
  }

  return isMember ? renderMemberTabs() : renderGuestTabs()
})

const WorkspaceHeader = memo((props: Props) => {
  const { t } = useLocale()
  const {
    workspace,
    tree = [],
    back = false,
    active,
    actions = []
  } = props

  const { currentUser } = useContext(UserContext)

  console.log("WorkspaceHeader re-rendered", { props });
  

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
        <Menu.Item key="add-discussion">
          <Link {...manage.manage.workspace.discussions.new(`${workspace.slug}`)}><a>{t('discussion.create.title')}</a></Link>
        </Menu.Item>
        <Menu.Item key="add-poll">
          <Link {...manage.manage.workspace.polls.new(`${workspace.slug}`)}><a>{t('poll.create.title')}</a></Link>
        </Menu.Item>
        <Menu.Item key="add-mission">
          <Link {...manage.manage.workspace.missions.new(`${workspace.slug}`)}><a>{t('mission.create.title')}</a></Link>
        </Menu.Item>
      </Menu>
    );

    return (<Dropdown key="dropdown" overlay={menu}>
      <Button type="ghost">
        {/* <span className="text-light">{' '}{icons.plussquare}</span> */}
        {/* {' '} */}
        {t('menu.create')}
      </Button>
    </Dropdown>)
  }


  const leftActions = [
    !isMember && <WorkspaceJoinButton key="workspace-join" workspace={workspace} user={currentUser}/>,
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
          title={<WorkspaceTitle
            name={workspace.name}
            image_url={workspace.image_url}
            isAdmin={isAdmin !== undefined}
            slug={workspace.slug}
            tree={tree}
            isMember={isMember !== undefined} />
          }
          extra={leftActions}
          {...onBack}
        >
        </PageTitle>

        <WorkspaceTabs
          active={active}
          isAdmin={isAdmin !== undefined}
          isMember={isMember !== undefined}
          slug={workspace.slug}
          discussions_count={workspace.discussions_count}
          polls_count={workspace.polls_count}
          missions_count={workspace.missions_count}
        />
      </header>
    </div>)
})

export default WorkspaceHeader
