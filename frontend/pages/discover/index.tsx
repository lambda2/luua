import React from 'react'
import { useCollection, fetchInitialData } from 'utils/http'

import NetworkBoundary from 'components/NetworkBoudary/NetworkBoudary'
import { NextPageContext } from 'next';
import { useLocale } from 'hooks/useLocale';
import ContentLayout from 'layouts/ContentLayout/ContentLayout';
import ExploreHeader from 'components/ExploreHeader/ExploreHeader';
import Grid from 'elements/Grid/Grid';
import WorkspaceGridItem from 'components/WorkspaceGridItem/WorkspaceGridItem';
import Title from 'elements/Title/Title';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import List from 'elements/List/List';
import icons from 'dictionaries/icons';
import Hero from 'elements/Hero/Hero';
import Home from 'content/Home';


interface Props {
  initialData: LightWorkspace[],
  token?: string
}

const DiscoverHome = (
  { token }: Props
) => {

  const { t, language } = useLocale()

  const HomeContent = (Home as any)[language]

  return (
    <>
      <ContentLayout>
        <HomeContent />
      </ContentLayout>
    </>
  )
}

export default DiscoverHome
