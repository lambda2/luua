import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useCollection, fetchInitialData} from '../../../../utils/http'
import { withAuthSync } from '../../../../utils/auth'
import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import { useLocale } from '../../../../hooks/useLocale';
import MessageBox from '../../../../elements/MessageBox/MessageBox'
import LoginForm from '../../../../components/LoginForm/LoginForm'
import UserContext from '../../../../contexts/UserContext'
import Link from 'next/link'
import ROUTES from '../../../../routes/routes'

/**
 * This is the page used to confirm the email address
 * of a new user
 */
const UserConfirmation = ({ initialData }: any) => {

  const { query } = useRouter()
  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const response = useCollection<AuthedUser>(
    `/users/confirmation?confirmation_token=${query.token}`,
    '', { }, { initialData, retry: false, manual: true }
  )

  useEffect(() => {
    response.refetch()
  }, [])

  return (<>
    <NetworkBoundary<AuthedUser> {...response}>
      <ContentLayout format="box">
        <MessageBox>
          {t('form.user.confirm.title')}
        </MessageBox>

        {!currentUser && <LoginForm email={response?.data?.email} />}
        {currentUser && <Link {...ROUTES.users.profile()}>{t('menu.profile')}</Link>}
      </ContentLayout>
    </NetworkBoundary>
    </>
  )
}

UserConfirmation.getInitialProps = async (ctx: any) => {
  return await fetchInitialData<any>(
    ctx, `/users/confirmation?confirmation_token=${ctx.query.token}`
  )
}

export default withAuthSync(UserConfirmation)