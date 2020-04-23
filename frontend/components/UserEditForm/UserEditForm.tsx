import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Form, Input } from 'formik-antd'
import UserContext from '../../contexts/UserContext';
import { cdnUrl } from '../../utils/http';
import { errorsFromResponse } from '../../utils/forms/helpers';
import icons from '../../dictionaries/icons';
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import YupWithLocale from '../../utils/forms/yup';
import { Tooltip } from 'antd';
import UploadAvatar from '../../elements/UploadAvatar/UploadAvatar';
import { FormCountrySelect } from '../CountrySelect/CountrySelect';
import Router from 'next/router';
import { useLocale } from '../../hooks/useLocale';


const UserEditForm = () => {
  const { t } = useLocale()
  const Yup = YupWithLocale()

  const { currentUser, update } = useContext(UserContext)

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const EditSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too short').required(),
    image: Yup.string(),
    first_name: Yup.string(),
    last_name: Yup.string(),
    country_id: Yup.number(),
    // timezone: Yup.string(),
  });

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

  const onUpload = (elt: any) => {
    console.log("onUpload", { elt });
  }

  return (
  <div>
    <Formik
      initialValues={{remove_image: false, ...currentUser}}
        onSubmit={async (values, { setErrors }) => {
        try {
          const data = await update(values)
          console.log("After save: ", { data });
          Router.push('/users/profile', `/users/profile`, { shallow: true })
        } catch (error) {
          setErrors(errorsFromResponse(error.response))
        }
      }}
      validationSchema={EditSchema}
    >
        {({ errors, isValid, isSubmitting, dirty, submitCount }) => (
          <Form {...formItemLayout} scrollToFirstError>
            <ErrorMessage name="globalErrors" />

            <Form.Item label={t('form.user.username.label')} name='username'>
              <Input disabled name="username" placeholder={t('form.user.username.placeholder')} />
            </Form.Item>

            <Form.Item label={t('form.user.first_name.label')} name='first_name'>
              <Input name="first_name" placeholder={t('form.user.first_name.placeholder')} />
            </Form.Item>

            <Form.Item label={t('form.user.last_name.label')} name='last_name'>
              <Input name="last_name" placeholder={t('form.user.last_name.placeholder')} />
            </Form.Item>

            <Form.Item label={t('form.user.image.label')} name='image'>
              <UploadAvatar label={
                <span>
                  <Tooltip title={t('form.user.image.hint')}>
                    {icons.question}
                  </Tooltip>
                  {' '}{t('form.user.image.buttonLabel')}
                </span>
              } name="image" imageUrl={currentUser.thumb_url && cdnUrl(currentUser.thumb_url)} multiple={false} onDone={onUpload} />
            </Form.Item>

            <Form.Item label={t('form.user.country.label')} name='country_id'>
              <FormCountrySelect name="country_id" placeholder={t('form.user.country.placeholder')}/>
            </Form.Item>

            {/* <Form.Item label={t('form.user.timezone.label')} name='timezone'>
              <Input name="timezone" placeholder={t('form.user.timezone.placeholder')} />
            </Form.Item> */}

            <Form.Item name="end" {...tailFormItemLayout}>
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

export default UserEditForm
