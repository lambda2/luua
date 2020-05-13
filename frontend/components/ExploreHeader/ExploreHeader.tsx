import React, { ReactElement, useContext } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { ROUTES } from '../../routes/routes';
import PageTitle from '../../elements/PageTitle/PageTitle';
import Link from 'next/link';
import classNames from 'classnames';
import UserContext from '../../contexts/UserContext';

type ResourceAction = 'show' | 'new' | 'edit' | 'destroy'

type ResourceButtons = {
  [key in ResourceAction]: ReactElement;
};

interface Props {
  extra?: (string | ReactElement)[]
  active?: string
  title?: string
}

const ExploreHeader = ({
  extra = [],
  active,
  title
}: Props) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  const renderTabs = () => {
    return (<ul className="ExploreHeaderMenu">
      <li className={classNames({ active: active == 'missions' })} key="/missions">
        <Link {...ROUTES.explore.missions.index()}><a>{t('menu.missions')}</a></Link>
      </li>
      <li className={classNames({ active: active == 'workspaces' })} key="/workspaces">
        <Link {...ROUTES.explore.workspace.index()}><a>{t('menu.workspaces')}</a></Link>
      </li>
    </ul>)
  }

  return (
    <div className="ExploreHeader">
      <header className="ExploreHeaderContent">
        <PageTitle
          level='1'
          title={<>{title || t('menu.explore')}</>}
          extra={extra}
        >
        </PageTitle>
        {renderTabs()}
      </header>
    </div>)
}

export default ExploreHeader
