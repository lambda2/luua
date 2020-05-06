import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';

const { manage } = routes

interface Props {
  discussion: LightDiscussion
}

const DiscussionItem = ({ discussion }: Props) => {

  const {
    id,
    name,
    description,
    slug,
    workspace_id,
    // mission_category,
  } = discussion

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (
    <div className="DiscussionItem">
      <h3>
        <Link key={id} {...manage.workspace.discussions.show(workspace_id, slug)}>
          <a>
            {name}
          </a>
        </Link>
      </h3>

      <div>
        {description}
      </div>
    </div>
  )

}

export default DiscussionItem