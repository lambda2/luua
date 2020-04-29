import React, { useContext } from 'react';
import { Field, ErrorMessage, Formik } from 'formik';
import UserContext from '../../contexts/UserContext';
import { createOrUpdate } from '../../api/workspace';
import { errorsFromResponse } from '../../utils/forms/helpers';
import { Form, Input, ResetButton, Select, Switch } from 'formik-antd'
import YupWithLocale from '../../utils/forms/yup';
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import icons from '../../dictionaries/icons';
import { Tooltip } from 'antd';
import UploadAvatar from '../../elements/UploadAvatar/UploadAvatar';
import { useLocale } from '../../hooks/useLocale';
import Router from 'next/router';
import { cdnUrl } from '../../utils/http';
import routes from '../../routes/manage'
import TextArea from '../../elements/TextArea/TextArea';

interface Props {
  workspace?: Workspace
  redirectOnSave?: string
}

const WorkspaceForm = ({ workspace, redirectOnSave }: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const Yup = YupWithLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: workspace?.id,
    name: workspace?.name || '',
    image: workspace?.image || '',
    description: workspace?.description || '',
    membership: workspace?.membership || 'closed',
    remove_image: false,
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required(),
    image: Yup.string(),
    description: Yup.string(),
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
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
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await createOrUpdate(values, currentUser.jwt)
          console.log("After save: ", { data });
          await check()
          if (redirectOnSave) {
            Router.push(redirectOnSave)
          } else {
            const dest = routes.manage.workspace.show(data.slug)
            Router.push(dest.href, dest.as)
          }
        } catch (error) {
          setErrors(errorsFromResponse(error.response))
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
              
              <Form.Item label={t('form.workspace.name.label')} name='name'>
                <Input prefix={<Tooltip title={t('form.workspace.name.hint')}>
                  {icons.question}
                </Tooltip>} name="name" placeholder={t('form.workspace.name.placeholder')} />
              </Form.Item>

              <Form.Item label={t('form.workspace.image.label')} name='image'>
                <span className="hint">{t('form.workspace.image.hint')}</span>
                <UploadAvatar
                  imageUrl={workspace?.thumb_url && cdnUrl(workspace?.thumb_url)}
                  label={<span>{t('form.workspace.image.placeholder')}</span>}
                  name="image"
                  multiple={false}
                  onDone={onUpload}
                />
              </Form.Item>

              <Form.Item label={t('form.workspace.description.label')} name='description'>
                <TextArea name="description" />
              </Form.Item>

              <Form.Item name="end" {...tailFormItemLayout}>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                  submitCount={submitCount}
                  isValid={isValid}
                  label={values.id ? t('form.workspace.update') : t('form.workspace.submit') }
                />
              </Form.Item>
            </Form>
        )}
    </Formik>
  </div>)
}

export default WorkspaceForm