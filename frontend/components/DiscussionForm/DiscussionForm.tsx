import React, { useContext } from 'react';
import { Field, ErrorMessage, Formik } from 'formik';
import UserContext from '../../contexts/UserContext';
import { createOrUpdate } from '../../api/discussion';
import { errorsFromResponse } from '../../utils/forms/helpers';
import { Form, Input, Radio } from 'formik-antd'
import YupWithLocale from '../../utils/forms/yup';
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import icons from '../../dictionaries/icons';
import { Tooltip } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import Router from 'next/router';
import { cdnUrl } from '../../utils/http';
import routes from '../../routes/manage'
import TextArea from '../../elements/TextArea/TextArea';

interface Props {
  discussion?: Discussion
  workspace?: LightWorkspace
  redirectOnSave?: string
}

const DiscussionForm = ({ discussion, redirectOnSave, workspace }: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const Yup = YupWithLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: discussion?.id,
    name: discussion?.name || '',
    description: discussion?.description || '',
    resource_type: discussion?.resource_type || 'Workspace',
    resource_id: discussion?.resource_id || workspace?.id,
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2).required(),
    description: Yup.string(),
  });

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
            const dest = routes.manage.workspace.discussions.show(data.resource_id, data.slug)
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
            <Form layout="vertical" scrollToFirstError>
              <ErrorMessage name="globalErrors" />
              
              <Form.Item label={t('form.discussion.name.label')} name='name'>
                <Input prefix={<Tooltip title={t('form.discussion.name.hint')}>
                  {icons.question}
                </Tooltip>} name="name" placeholder={t('form.discussion.name.placeholder')} />
              </Form.Item>

              <Form.Item label={t('form.discussion.description.label')} name='description'>
                <TextArea name="description" />
              </Form.Item>

              <Form.Item name="end">
                <SubmitButton
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                  submitCount={submitCount}
                  isValid={isValid}
                  label={values.id ? t('form.discussion.update') : t('form.discussion.submit') }
                />
              </Form.Item>
            </Form>
        )}
    </Formik>
  </div>)
}

export default DiscussionForm