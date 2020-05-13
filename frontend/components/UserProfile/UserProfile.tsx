import React from 'react';
import Link from 'next/link';
import { useLocale } from '../../hooks/useLocale';
import { logout } from '../../utils/auth'
import { Button } from 'antd';
import routes from '../../routes/routes'
import PageSection from '../../elements/PageSection/PageSection';
import List from '../../elements/List/List';
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

  return (
  <>

    <PageSection title={t('menu.skills')}>
      {user_skills.length === 0 && <p>
          {t('skill.no-skills-yet.title')}. <Link {...users.skills()}><a>{t('skill.no-skills-yet.add-now')}</a></Link>
      </p>}
        <SkillsForm />
      {/* {user_skills.length > 0 && <div>
        <ul>{user_skills.map((s: UserSkill) => <li key={s.id}>{s.name}</li>)}</ul>
          <Link {...routes.users.skills()}><a>{t('form.skill.edit-skill')}</a></Link>
      </div>} */}
    </PageSection>

    <PageSection title={t('menu.missions')}>
      <List
        emptyText={t('mission.empty')}
        dataSource={mission_users}
        renderItem={(e: LightMissionUser) => <MissionUserItem {...e} user={user} mission={e.mission} />}
      />
    </PageSection>
    
    <PageSection title={t('menu.workspaces')}>
        <List
          emptyText={t('workspace.empty')}
          dataSource={workspaces}
          renderItem={(e: LightWorkspace) => <WorkspaceItem {...e} />}
        />
        <Link {...routes.manage.workspace.new()}><a>{t('workspace.no-workspace-yet.create-now')}</a></Link>
    </PageSection>


    <hr />
    <div>
      <Button onClick={logout}>{t('menu.logout')}</Button>
    </div>
  </>)
}

export default UserProfile