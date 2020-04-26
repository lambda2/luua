import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { errorsFromResponse } from '../../utils/forms/helpers';
import { Form, Input } from 'formik-antd'
import { authenticateWithCredentials } from '../../utils/auth';
import { Tooltip } from 'antd';
import icons from '../../dictionaries/icons';
import { SubmitButton } from 'formik-antd';
import YupWithLocale from '../../utils/forms/yup';
import { useLocale } from '../../hooks/useLocale';
import PageSection from '../../elements/PageSection/PageSection';
import MessageBox from '../../elements/MessageBox/MessageBox';
import ROUTES from '../../routes/manage';
import Link from 'next/link';

interface Props { }

const SignupForm = () => {

  const { t } = useLocale()
  const Yup = YupWithLocale()

  console.log({ Yup });
  

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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

  const initialValues = {
    email: '',
    password: '',
  }

  const EditSchema = Yup.object().shape({
    email: Yup
      .string()
      .email()
      .required(),
    password: Yup
      .string()
      .required()
      .min(6)
      .max(32)
  });

  return (
    <div>
      <PageSection title={t('menu.sign-in')}>
        <br />
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            console.log("Auth", { values });
            try {
              const data = await authenticateWithCredentials(
                values.email || '',
                values.password || ''
              )
            } catch (error) {
              console.log({ error });
              console.log({ errors: errorsFromResponse(error.response) });
              setErrors(errorsFromResponse(error.response))
            }
          }}
          validationSchema={EditSchema}
        >
        {({
          isSubmitting,
          isValid,
          dirty,
          submitCount
        }) => (
            <Form {...formItemLayout} scrollToFirstError>
              <ErrorMessage name="globalErrors" />

              <Form.Item label={t('form.user.email.label')} name='email'>
                <Input prefix={<Tooltip title={t('form.user.email.hint')}>
                  {icons.question}
                </Tooltip>} name="email" type={'email'} placeholder={t('form.user.email.placeholder')} />
              </Form.Item>

              <Form.Item label={t('form.user.password.label')} name='password'>
                <Input.Password prefix={<Tooltip title={t('form.user.password.hint')}>
                  {icons.question}
                </Tooltip>} name="password" type={'password'} placeholder={t('form.user.password.placeholder')} />
              </Form.Item>

              <Form.Item name="end" {...tailFormItemLayout}>
                <SubmitButton>{t('form.user.sign-in.submit')}</SubmitButton>
              </Form.Item>
            </Form>
          )}
        </Formik>
        <MessageBox>
          <span>{t('form.user.sign-up.no-account')}{' '}</span><Link {...ROUTES.users.signup()}>{t('form.user.sign-up.submit')}</Link>
        </MessageBox>
      </PageSection>
    </div>)
}

export default SignupForm
