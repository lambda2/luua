import React, { ReactElement, useContext } from 'react';
import { useLocale } from 'hooks/useLocale';
import manage, { ROUTES } from 'routes/routes';
import PrimaryLink from 'elements/PrimaryLink/PrimaryLink';
import PageTitle from 'elements/PageTitle/PageTitle';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import Link from 'next/link';
import classNames from 'classnames';
import UserContext from 'contexts/UserContext';
import find from 'lodash/find';
import can from 'utils/can';
import { Menu, Dropdown, Button, Tag } from 'antd';
import icons from 'dictionaries/icons';
import { Tabs, Tab, TabSpacer } from 'elements/TabMenu/TabMenu';

type ResourceAction = 'show' | 'new' | 'edit' | 'destroy'

type ResourceButtons = {
  [key in ResourceAction]: ReactElement;
};

interface Props {
  workspace: Workspace
  mission: BaseMission
  active?: string
  onDestroy: (mission: BaseMission) => void
  actions?: ResourceAction[]
}

const MissionHeader = ({
  workspace,
  mission,
  active,
  onDestroy,
  actions = ['edit']
}: Props) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)


  const menu = (
    <Menu>
      {can(currentUser, 'mission.edit', mission) && <Menu.Item key="edit-mission">
        <Link {...ROUTES.manage.workspace.missions.edit(mission?.workspace_id, mission?.slug)}><a>{t(('form.mission.edit'))}</a></Link>
      </Menu.Item>}

      {can(currentUser, 'mission.destroy', mission) && <Menu.Item key="destroy-mission">
        <a href="#" className="text-danger" onClick={() => onDestroy(mission)}>{t('form.mission.delete')}</a>
      </Menu.Item>}

    </Menu>
  );

  const isAdmin = find(workspace.workspace_users, {admin: true, user_id: currentUser?.id})
  const isMember = isAdmin || find(workspace.workspace_users, {user_id: currentUser?.id})

  const renderGuestTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary">
        <Link {...ROUTES.manage.workspace.missions.show(workspace.slug, mission.slug)}><a>{t('mission.summary')}</a></Link>
      </Tab>
      <Tab active={active} name="discussion">
        <Link {...ROUTES.manage.workspace.missions.discussion(workspace.slug, mission.slug)}><a>{t('mission.chat')}</a></Link>
      </Tab>
    </Tabs>
  }

  const renderMemberTabs = () => {
    return <Tabs>
      <Tab active={active} name="summary">
        <Link {...ROUTES.manage.workspace.missions.show(workspace.slug, mission.slug)}><a>{t('mission.summary')}</a></Link>
      </Tab>
      <Tab active={active} name="discussion">
        <Link {...ROUTES.manage.workspace.missions.discussion(workspace.slug, mission.slug)}><a>{t('mission.chat')}</a></Link>
      </Tab>
      <TabSpacer />
      {isAdmin && <Tab active={active} name="settings">
        <Link {...ROUTES.manage.workspace.missions.edit(workspace.slug, mission.slug)}>
          <a>{t('menu.settings')}</a>
        </Link>
      </Tab> || <></>}
    </Tabs>
  }

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
            <span>
              {/* <Tag>{mission.status}</Tag> */}
              {mission.name}
            </span>
          </>}
          extra={[
            <aside key="options">
              <Dropdown key="dropdown" overlay={menu}>
                <Button type="link">
                  <span className="text-light">{' '}{icons.down}</span>
                </Button>
              </Dropdown>
            </aside>
          ]}
        >
        </PageTitle>
        {isMember && renderMemberTabs() || renderGuestTabs()}
      </header>
    </div>)
}

export default MissionHeader
