import React from 'react'
import Router from 'next/router'
import ContentLayout from '../../../layouts/ContentLayout/ContentLayout'
import UserEditPopupForm from '../../../components/UserEditPopupForm/UserEditPopupForm'
import PageSection from '../../../elements/PageSection/PageSection'
import { useLocale } from '../../../hooks/useLocale'


/**
 * This is a temporary page to onboard the new user
 */
const CompleteInfos = () => {

  const { t } = useLocale()

  const onSave = () => {
    Router.push({
      pathname: '/profile',
      query: { status: 'welcome' },
    })
  }

  const onSkip = () => {
    Router.push({
      pathname: '/profile',
      query: { status: 'welcome' },
    })
  }

  return (
    <ContentLayout format="box">
      <PageSection title={t('user.complete-infos')}>
        <br />
        <UserEditPopupForm onSave={onSave} onSkip={onSkip}/>
      </PageSection>
    </ContentLayout>
  )
}

export default CompleteInfos