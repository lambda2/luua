import React, { useContext } from 'react'
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import MenuTitle from 'elements/MenuTitle/MenuTitle';
import Affix from 'antd/lib/affix';
import ROUTES from 'routes/routes';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router'
import can from 'utils/can';
import icons from 'dictionaries/icons';

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
      <MenuTitle>
        <span>{t('menu.categories')}</span>{' '}
        {can(currentUser, 'workspace.edit', workspace) && <span>
          {' '}
          <Link {...ROUTES.manage.workspace.categories(workspace.slug)}>
          <a>{t('menu.edit')}</a>
        </Link>
      </span>}
      </MenuTitle>
      <ul className="text-light">
        <li className={classNames({ active: active === 'all' })} key={'all'}>
          <Link {...ROUTES.manage.workspace.discussions.index(workspace.slug)}>
            <a>
              <span className="menu-icon">{icons.asterisk}</span>
              {' '}{t('menu.all-discussions')}</a>
          </Link>
        </li>
        {workspace.discussion_categories.map(dc => {
          return <li className={classNames({ active: active === dc.slug })} key={dc.id}>
            <Link {...ROUTES.manage.workspace.discussions.category.index(workspace.slug, dc.slug)}>
              <a>
                <span className="menu-icon">{dc.icon}</span>
                {' '}{dc.name}
              </a>
            </Link>
          </li>
        })}
      </ul>
    </Affix>
  </aside>)
}

export default DiscussionsLeftMenu
