import React, { useContext } from 'react';
import Link from 'next/link';
import { useLocale } from '../../hooks/useLocale';
import { logout } from '../../utils/auth'
import { Button } from 'antd';
import PageTitle from '../../elements/PageTitle/PageTitle';

import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import PrimaryLink from '../../elements/PrimaryLink/PrimaryLink';
import routes from '../../routes/manage'
import PageSection from '../../elements/PageSection/PageSection';
import { nameForUser } from '../../utils/user';
const { users } = routes

const UserProfile = ({
  username,
  first_name,
  last_name,
  email,
  user_skills,
  thumb_url,
  workspaces,
}: AuthedUser) => {

  const { t } = useLocale()

  return (
  <>

    <PageTitle
      title={
        <>
          <UserAvatar
            name={username}
            size="default"
            src={thumb_url}
          />
          {' '}
          {nameForUser({ username, first_name, last_name })}
        </>
      }
      extra={[
        <PrimaryLink key={'edit'} {...users.edit()}>{t('menu.edit')}</PrimaryLink>
      ]}
    >
    </PageTitle>

    <p className="lead">{email}</p>

    <PageSection title={t('menu.skills')}>
      {user_skills.length === 0 && <p>
        You didn't set any skills yet. <Link href={`/users/skills`}><a>Add now</a></Link>
      </p>}
      {user_skills.length > 0 && <div>
        <ul>{user_skills.map((s: UserSkill) => <li key={s.id}>{s.name}</li>)}</ul>
          <Link href={`/users/skills`}><a>{t('form.skill.edit-skill')}</a></Link>
      </div>}
    </PageSection>

    <PageSection title={t('menu.workspaces')}>
      {workspaces.length === 0 && <p>
        {t('workspace.no-workspace-yet.title')}
        .{' '}
        <Link href={`/workspaces/new`}><a>{t('workspace.no-workspace-yet.create-now')}.</a></Link>
      </p>}
      {workspaces.length > 0 && <div>
        <ul>{workspaces.map((s: LightWorkspace) => {
        return (<li key={s.id}>
          <Link key={s.id} href={`/workspaces/[id]`} as={`/workspaces/${s.slug}`}>
            <a>
              <h2>{s.name}</h2>
              <p>{s.missions_count} Missions · {s.users_count} Users</p>
            </a>
          </Link>
        </li>)
      })}</ul>
        <Link href={`/workspaces/new`}><a>Create a new workspace</a></Link>
      </div>}
    </PageSection>

    <hr />
    <div>
      <Button onClick={logout}>{t('menu.logout')}</Button>
    </div>
  </>)
}

export default UserProfile