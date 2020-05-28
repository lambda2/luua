import React from 'react';
import Link from 'next/link';
import { useLocale } from 'hooks/useLocale';
import { logout } from 'utils/auth'
import { Button } from 'antd';
import routes from 'routes/routes'
import PageSection from 'elements/PageSection/PageSection';
import List from 'elements/List/List';
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem';
import MissionUserItem from '../MissionUserItem/MissionUserItem';
import SkillsForm from '../SkillsForm/SkillsForm';
const { users } = routes

const UserProfile = (user: AuthedUser) => {

  const {
    username,
    first_name,
    last_name,
    email,
    user_skills,
    mission_users,
    thumb_url,
    workspaces,
  } = user
  const { t } = useLocale()


  const emptyWorkspaces = () => {
    return <div className="text-centered text-light">
      <p>
        {t('workspace.no-workspace-yet.title')}.{' '}
        <Link {...routes.manage.workspace.new()}><a>{t('workspace.no-workspace-yet.create-now')}</a></Link>
        {' '}{t('generics.or')}{' '}
        <Link {...routes.explore.workspace.index()}><a>{t('workspace.no-workspace-yet.browse')}</a></Link>
        </p>
    </div>
  }

  return (
  <>
    <PageSection title={t('menu.workspaces')}>
      <List
        renderEmpty={emptyWorkspaces}
        dataSource={workspaces}
        renderItem={(e: LightWorkspace) => <WorkspaceItem {...e} />}
      />
      {workspaces?.length > 0 && <Link {...routes.manage.workspace.new()}><a>{t('workspace.no-workspace-yet.create-now')}</a></Link>}
    </PageSection>

    <PageSection title={t('menu.missions')}>
      <List
        emptyText={t('mission.empty')}
        dataSource={mission_users}
        renderItem={(e: LightMissionUser) => <MissionUserItem {...e} user={user} mission={e.mission} />}
      />
    </PageSection>

    <PageSection title={t('menu.skills')}>
      {/* {user_skills.length === 0 && <p>
        {t('skill.no-skills-yet.title')}
    </p>} */}
      <SkillsForm />
      {/* {user_skills.length > 0 && <div>
      <ul>{user_skills.map((s: UserSkill) => <li key={s.id}>{s.name}</li>)}</ul>
        <Link {...routes.users.skills()}><a>{t('form.skill.edit-skill')}</a></Link>
    </div>} */}
    </PageSection>

    <hr />
    <div>
      <Button onClick={logout}>{t('menu.logout')}</Button>
    </div>
  </>)
}

export default UserProfile