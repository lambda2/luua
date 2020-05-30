import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import MenuTitle from 'elements/MenuTitle/MenuTitle';
import Affix from 'antd/lib/affix';

interface Props {
  workspace: Workspace
}

/**
 * The left part of the discussions list.
 * It shows discussions categories
 */
const DiscussionsLeftMenu = ({
  workspace
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (<aside className="DiscussionsLeftMenu">
    <Affix offsetTop={60}>
      <MenuTitle>{t('menu.categories')}</MenuTitle>
      <ul className="text-light">
        {workspace.discussion_categories.map(dc => {
          return <li>
            {dc.icon}{' '}{dc.name}
          </li>
        })}
      </ul>
    </Affix>
  </aside>)
}

export default DiscussionsLeftMenu
