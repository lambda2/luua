import React from 'react'
import { withAuthSync } from '../../utils/auth'
import SkillsForm from '../../components/SkillsForm/SkillsForm'
import PageTitle from '../../elements/PageTitle/PageTitle'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import { useLocale } from "../../hooks/useLocale";

/**
 * The user's skills page
 */
const Skills = (props: any) => {
  const { t } = useLocale()
  
  return (
    <ContentLayout>
      <PageTitle title={t('form.user.skills.submit')}/>
      <SkillsForm />
    </ContentLayout>
  )
}

export default withAuthSync(Skills)