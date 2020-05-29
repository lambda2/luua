import React, { useContext } from 'react';
import UserContext from 'contexts/UserContext';
import routes from 'routes/routes'

import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import TitleWithAvatar from 'elements/TitleWithAvatar/TitleWithAvatar';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import find from 'lodash/find';
import WorkspaceJoinButton from 'components/WorkspaceJoinButton/WorkspaceJoinButton';
import Tag from 'elements/Tag/Tag';

const { manage } = routes

interface Props extends LightWorkspace {}

const WorkspaceGridItem = (workspace: Props) => {

  const {
    id,
    name,
    thumb_url,
    missions_count,
    description,
    users_count,
    discussions_count,
    slug,
  } = workspace

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  const isMember = find(currentUser?.workspace_users || [], { workspace_id: id })
  const isAdmin = find(currentUser?.workspace_users || [], { workspace_id: id, admin: true })

  return (
    <div className="WorkspaceItem WorkspaceGridItem">
      <TitleWithAvatar
        level='4'
        avatar={<UserAvatar size="large" src={thumb_url} name={slug} />}
        
      >
        {<Link {...manage.workspace.show(slug)}>
          <a>
            <span>{name}</span>
            <div className="sub-title text-light">{discussions_count} {t('menu.discussions')} · {users_count} {t('workspace.members')}</div>
          </a>
        </Link>}
      </TitleWithAvatar>
      <div>
        {!isMember && <WorkspaceJoinButton key="workspace-join" workspace={workspace} user={currentUser} />}
        {isMember && <Tag className={`tag-${isAdmin ? 'admin' : 'member'}`}>{isAdmin ? t('generics.admin') : t('generics.member')}</Tag>}
      </div>
    </div>
  )

}

export default WorkspaceGridItem