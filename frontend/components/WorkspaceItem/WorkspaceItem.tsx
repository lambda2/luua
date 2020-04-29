import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';

import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';
import find from 'lodash/find';
import CandidateStatusStep from '../../elements/CandidateStatusStep/CandidateStatusStep';
import MessageBox from '../../elements/MessageBox/MessageBox';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';

const { manage } = routes

interface Props extends LightWorkspace {}

const WorkspaceItem = ({
  id,
  name,
  thumb_url,
  missions_count,
  description,
  users_count,
  slug,
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (
    <div className="WorkspaceItem">
      <h3 className="List-title">
        {<Link {...manage.workspace.show(slug)}>
          <a>
            <Avatar size="large" src={cdnUrl(thumb_url || '')} />
            <span>{name}</span>
          </a>
        </Link>}
      </h3>
      <div>
        <MarkdownContent content={description} />
        <p>{missions_count} Missions · {users_count} Users</p>
      </div>
    </div>
  )

}

export default WorkspaceItem