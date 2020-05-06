import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';

const { manage } = routes

interface Props {
  discussion: LightDiscussion
}

const DiscussionItem = ({ discussion }: Props) => {

  const {
    id,
    name,
    slug,
    // mission_category,
  } = discussion

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (
    <div className="DiscussionItem">
      <h3>
        {name}
        {/* <Link key={id} {...manage.workspace.missions.show(workspace?.slug || workspace_id, slug)}>
          <a>
            <header>
              <Avatar size="small" src={cdnUrl(workspace?.thumb_url || '')} />
              <span className="org-title">{workspace?.name}</span>
            </header>
            {name}
          </a>
        </Link> */}
      </h3>

      <div>
      </div>
    </div>
  )

}

export default DiscussionItem