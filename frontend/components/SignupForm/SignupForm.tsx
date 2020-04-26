import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { errorsFromResponse } from '../../utils/forms/helpers';
import { Form, Input } from 'formik-antd'
import { signupWithCredentials } from '../../utils/auth';
import { Tooltip } from 'antd';
import icons from '../../dictionaries/icons';
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import YupWithLocale from '../../utils/forms/yup';
import { useLocale } from '../../hooks/useLocale';
import PageSection from '../../elements/PageSection/PageSection';
import MessageBox from '../../elements/MessageBox/MessageBox';
import Link from 'next/link';
import ROUTES from '../../routes/manage';

const SignupForm = () => {

  const { t } = useLocale()
  const Yup = YupWithLocale()
  
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
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const EditSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(),
    email: Yup
      .string()
      .email()
      .required(),
    password: Yup
      .string()
      .required()
      .min(6, 'Seems a bit short...')
      .max(32, 'Is too long.'),
    password_confirmation: Yup
      .string()
      .required()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <div>
      <PageSection title={t('menu.sign-up')}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          console.log("Auth", { values });
          try {
            const data = await signupWithCredentials(
              values.username || '',
              values.email || '',
              values.password || '',
              values.password_confirmation || ''
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

              <Form.Item label={t('form.user.username.label')} name='username'>
                <Input prefix={<Tooltip title={t('form.user.username.hint')}>
                  {icons.question}
                </Tooltip>} name="username" placeholder={t('form.user.username.placeholder')} />
              </Form.Item>
              
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
              
              <Form.Item label={t('form.user.password_confirmation.label')} name='password_confirmation'>
                <Input.Password prefix={<Tooltip title={t('form.user.password_confirmation.hint')}>
                  {icons.question}
              </Tooltip>} name="password_confirmation" type={'password'} placeholder={t('form.user.password_confirmation.placeholder')} />
              </Form.Item>

              {/* <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item> */}
              <Form.Item name="end" {...tailFormItemLayout}>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                  submitCount={submitCount}
                  isValid={isValid}
                  label={t('form.user.sign-up.submit')}
                />
              </Form.Item>
            </Form>
          )}
        </Formik>
        <MessageBox>
          <span>{t('form.user.sign-in.have-account')}{' '}</span><Link {...ROUTES.users.login()}>{t('form.user.sign-in.submit')}</Link>
        </MessageBox>
      </PageSection>
    </div>)
}

export default SignupForm