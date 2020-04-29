import React, { useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import api, { getHeaders, useCollection, cdnUrl, fetchInitialData} from '../../../../utils/http'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../../../../utils/auth'
import NetworkBoundary from '../../../../components/NetworkBoudary/NetworkBoudary'
import NotificationList from '../../../../components/NotificationList/NotificationList'
import { NextPageContext } from 'next'
import ContentLayout from '../../../../layouts/ContentLayout/ContentLayout'
import ManageLeftMenu from '../../../../layouts/ManageLeftMenu/ManageLeftMenu'
import PageTitle from '../../../../elements/PageTitle/PageTitle'
import { Avatar, Typography, Button } from 'antd'
import PrimaryLink from '../../../../elements/PrimaryLink/PrimaryLink'
const { Title } = Typography;
import manage from '../../../../routes/manage';
import { useLocale } from '../../../../hooks/useLocale';
import UserContext from '../../../../contexts/UserContext'
import MessageBox from '../../../../elements/MessageBox/MessageBox'
import LoginForm from '../../../../components/LoginForm/LoginForm'

/**
 * This is the page used to confirm the email address
 * of a new user
 */
const UserConfirmation = ({ initialData }: any) => {

  const { query } = useRouter()
  const { t } = useLocale()

  const response = useCollection<AuthedUser>(
    `/users/confirmation?confirmation_token=${query.token}`,
    '', { }, { initialData, retry: false, manual: true }
  )

  useEffect(() => {
    response.refetch()
  }, [])

  console.log({initialData})
  console.log(response?.data)

  return (<>
    <NetworkBoundary<AuthedUser> {...response}>
      <ContentLayout format="box">
        <MessageBox>
          {t('form.user.confirm.title')}
        </MessageBox>

        <LoginForm email={response?.data?.email} />
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