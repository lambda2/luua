import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Form, Input, Switch } from 'formik-antd'
import UserContext from 'contexts/UserContext';
import { cdnUrl } from 'utils/http';
import { errorsFromResponse } from 'utils/forms/helpers';
import icons from 'dictionaries/icons';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import YupWithLocale from 'utils/forms/yup';
import { Tooltip } from 'antd';
import UploadAvatar from 'elements/UploadAvatar/UploadAvatar';
import { FormCountrySelect } from '../CountrySelect/CountrySelect';
import Router from 'next/router';
import { useLocale } from 'hooks/useLocale';


const UserEditMailsForm = () => {
  const { t } = useLocale()
  const Yup = YupWithLocale()

  const { currentUser, update } = useContext(UserContext)

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const EditEmailsSchema = Yup.object().shape({
    email_newsletters: Yup.boolean(),
    email_notifications: Yup.boolean()
  });

  return (
  <div>
    <Formik
        initialValues={currentUser}
        onSubmit={async (values, { setErrors }) => {
        try {
          const data = await update(values)
          console.log("After save: ", { data });
          Router.push('/profile', `/profile`, { shallow: true })
        } catch (error) {
          setErrors(errorsFromResponse(error.response))
        }
      }}
      validationSchema={EditEmailsSchema}
    >
        {({ errors, isValid, isSubmitting, dirty, submitCount }) => (
          <Form layout="vertical" scrollToFirstError>
            <ErrorMessage name="globalErrors" />

            <Form.Item label={t('form.user.email_newsletters.label')} name='email_newsletters'>
              <p className="text-light">{t('form.user.email_newsletters.hint')}</p>
              <Switch
                name="email_newsletters"
                checkedChildren={t('generics.yes')}
                unCheckedChildren={t('generics.no')}
              />
            </Form.Item>

            <Form.Item label={t('form.user.email_notifications.label')} name='email_notifications'>
              <p className="text-light">{t('form.user.email_notifications.hint')}</p>
              <Switch
                name="email_notifications"
                checkedChildren={t('generics.yes')}
                unCheckedChildren={t('generics.no')}
              />
            </Form.Item>

            <Form.Item name="end">
              <SubmitButton
                isSubmitting={isSubmitting}
                dirty={dirty}
                submitCount={submitCount}
                isValid={isValid}
                label={t('form.user.edit.submit')}
              />
            </Form.Item>

            </Form>
        )}
    </Formik>
  </div>)
}

export default UserEditMailsForm
