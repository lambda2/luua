import React from 'react'
import { withAuthSync } from '../../utils/auth'
import SkillsForm from '../../components/SkillsForm/SkillsForm'
import PageTitle from '../../elements/PageTitle/PageTitle'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../layouts/ManageLeftMenu/ManageLeftMenu'
import { useLocale } from "../../hooks/useLocale";

const Skills = (props: any) => {
  const { t } = useLocale()
  
  return (
    <ContentLayout sideMenu={<ManageLeftMenu />}>
      <PageTitle title={t('form.user.skills.submit')}/>
      <SkillsForm />
    </ContentLayout>
  )
}

export default withAuthSync(Skills)