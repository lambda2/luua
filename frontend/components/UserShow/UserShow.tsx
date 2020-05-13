import React from 'react';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  user: User
  workspaces?: LightWorkspace[]
  missions?: LightMission[]
}

const UserShow = ({ user }: Props) => {

  const { t } = useLocale()

  const {
    username,
    first_name,
    last_name,
    email,
    thumb_url,
  } = user

  return (
  <>
    <p>{ email } </p>

    {/* <PageSection title={t('menu.skills')}>
      {user_skills.length === 0 && <p>
          {t('skill.no-skills-yet.title')}. <Link {...users.skills()}><a>{t('skill.no-skills-yet.add-now')}</a></Link>
      </p>}
      {user_skills.length > 0 && <div>
        <ul>{user_skills.map((s: UserSkill) => <li key={s.id}>{s.name}</li>)}</ul>
          <Link {...routes.users.skills()}><a>{t('form.skill.edit-skill')}</a></Link>
      </div>}
    </PageSection> */}
{/* 
    {<PageSection title={t('menu.workspaces')}>
      {workspaces.length === 0 && <p>
        {t('workspace.no-workspace-yet.title')}
      </p>}
      {workspaces.length > 0 && <div>
        <ul>{workspaces.map((s: LightWorkspace) => {
        return (<li key={s.id}>
          <Link key={s.id} {...routes.manage.workspace.show(s.slug)} as={`/workspaces/${s.slug}`}>
            <a>
              <h2>{s.name}</h2>
              <p>{s.missions_count} Missions · {s.users_count} Users</p>
            </a>
          </Link>
        </li>)
      })}</ul>
        <Link {...routes.manage.workspace.new()}><a>{t('workspace.no-workspace-yet.create-now')}</a></Link>
      </div>}
    </PageSection> */}

  </>)
}

export default UserShow