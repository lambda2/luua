import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { invite } from 'api/workspace';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import { useLocale } from 'hooks/useLocale';
import Router, { useRouter } from 'next/router';
import routes from 'routes/routes'
import MessageBox from 'elements/MessageBox/MessageBox';

interface Props {
  workspace_invitation?: WorkspaceInvitation
  onSave?: () => void
}

const WorkspaceInvitationForm = ({ workspace_invitation, onSave }: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const Yup = YupWithLocale()
  const { query } = useRouter()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: workspace_invitation?.id,
    email: workspace_invitation?.email || '',
    username: '',
    send_email: workspace_invitation?.send_email || false,
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    email: Yup.string().email(),
    username: Yup.string()
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
  <div className="WorkspaceInvitationForm">
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await invite(`${query.workspace_id}`, values, currentUser.jwt)
          console.log("After save: ", { data });
          await check()
          if (onSave) {
            onSave()
          } else {
            const dest = routes.manage.workspace.show(`${query.workspace_id}`)
            Router.push(dest.href, dest.as)
          }
        } catch (error) {
          if (error?.response?.data?.errors?.user_id) {
            setErrors({ username: error?.response?.data?.errors?.user_id })
          } else {
            setErrors(errorsFromResponse(error.response))
          }
        }
      }}
      validationSchema={EditSchema}
    >
        {({
          values,
          isSubmitting,
          isValid,
          dirty,
          submitCount
        }) => (
            <Form {...formItemLayout} scrollToFirstError>
              <ErrorMessage name="globalErrors" />
              
              <MessageBox>{t('form.workspace_invitation.description')}</MessageBox>
              <Form.Item label={t('form.workspace_invitation.username.label')} name='username'>
                <Input disabled={!!values.email} name="username" />
              </Form.Item>
              <div className="text-centered or-separator">
                {t('generics.or')}
              </div>
              <Form.Item label={t('form.workspace_invitation.email.label')} name='email'>
                <Input disabled={!!values.username} name="email" />
              </Form.Item>
              <br />
              <SubmitButton
                isSubmitting={isSubmitting}
                dirty={dirty}
                block
                submitCount={submitCount}
                isValid={isValid}
                label={t('form.workspace_invitation.submit', { name: (values.username || values.email)})}
              />
            </Form>
        )}
    </Formik>
  </div>)
}

export default WorkspaceInvitationForm