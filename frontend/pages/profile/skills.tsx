import React, { useContext } from 'react'
import { withAuthSync } from 'utils/auth'
import SkillsForm from 'components/SkillsForm/SkillsForm'
import PageTitle from 'elements/PageTitle/PageTitle'
import ContentLayout from 'layouts/ContentLayout/ContentLayout'
import { useLocale } from "../../hooks/useLocale";
import UserHeader from 'components/UserHeader/UserHeader'
import UserContext from 'contexts/UserContext'
import UserSettingsMenu from 'layouts/UserSettingsMenu/UserSettingsMenu'

/**
 * The user's skills page
 */
const Skills = (props: any) => {
  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)
  
  return (<>
    {currentUser && <UserHeader user={currentUser as AuthedUser} active='skills' />}
    <ContentLayout style={{maxWidth: '700px'}} sideMenu={<UserSettingsMenu active='skills' />}>
      <PageTitle title={t('form.user.skills.submit')}/>
      <SkillsForm />
    </ContentLayout>
  </>)
}

export default withAuthSync(Skills)