import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import MenuTitle from 'elements/MenuTitle/MenuTitle';
import Affix from 'antd/lib/affix';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router'

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
  const { query } = useRouter()
  const active = query.category || 'all'

  return (<aside className="DiscussionsLeftMenu">
    <Affix offsetTop={60}>
      <MenuTitle>{t('menu.categories')}</MenuTitle>
      <ul className="text-light">
        <li className={classNames({ active: active === 'all' })} key={'all'}>
          <Link {...ROUTES.manage.workspace.discussions.index(workspace.slug)}>
            <a>{t('menu.all-discussions')}</a>
          </Link>
        </li>
        {workspace.discussion_categories.map(dc => {
          return <li className={classNames({ active: active === dc.slug })} key={dc.id}>
            <Link {...ROUTES.manage.workspace.discussions.category.index(workspace.slug, dc.slug)}>
              <a>{dc.icon}{' '}{dc.name}</a>
            </Link>
          </li>
        })}
      </ul>
    </Affix>
  </aside>)
}

export default DiscussionsLeftMenu
