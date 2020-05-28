import React, { ReactElement, useContext } from 'react';
import { useLocale } from 'hooks/useLocale';
import { ROUTES } from 'routes/routes';
import PageTitle from 'elements/PageTitle/PageTitle';
import Link from 'next/link';
import { Tabs, Tab } from 'elements/TabMenu/TabMenu';

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

  const renderTabs = () => {
    return <Tabs>
      <Tab active={active} name="missions">
        <Link {...ROUTES.explore.missions.index()}><a>{t('menu.missions')}</a></Link>
      </Tab>
      <Tab active={active} name="workspaces">
        <Link {...ROUTES.explore.workspace.index()}><a>{t('menu.workspaces')}</a></Link>
      </Tab>
    </Tabs>
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
