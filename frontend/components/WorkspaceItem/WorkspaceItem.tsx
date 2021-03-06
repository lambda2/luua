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

const { manage } = routes

interface Props extends LightWorkspace {}

const WorkspaceItem = (workspace: Props) => {

  const {
    id,
    name,
    thumb_url,
    missions_count,
    description,
    users_count,
    slug,
  } = workspace

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  const isMember = find(currentUser?.workspace_users || [], { workspace_id: id })

  return (
    <div className="WorkspaceItem">
      <TitleWithAvatar
        level='4'
        avatar={<UserAvatar size="large" src={thumb_url} name={slug} />}
      >
        {<Link {...manage.workspace.show(slug)}>
          <a>
            <span>{name}</span>
            <div className="sub-title text-light">{missions_count} {t('workspace.missions')} · {users_count} {t('workspace.members')}</div>
          </a>
        </Link>}
      </TitleWithAvatar>
      <div>
        <MarkdownContent content={description} />
      </div>
      {/* <div>
        {!isMember && <WorkspaceJoinButton key="workspace-join" workspace={workspace} user={currentUser} />}
      </div> */}

    </div>
  )

}

export default WorkspaceItem