import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/discussion';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input, Select } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import icons from 'dictionaries/icons';
import { Tooltip } from 'antd';
import { useLocale } from 'hooks/useLocale';
import Router from 'next/router';
import routes from 'routes/routes'
import TextArea from 'elements/TextArea/TextArea';
import FormDiscussionCategorySelect from '../DiscussionCategorySelect/DiscussionCategorySelect';

interface Props {
  discussion?: Discussion
  workspace?: LightWorkspace
  redirectOnSave?: string
}

const EmbedDiscussionForm = ({ discussion, redirectOnSave, workspace }: Props) => {

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
    discussion_category_id: discussion?.discussion_category?.id?.toString(),
    description: '',
    resource_type: discussion?.resource_type || 'Workspace',
    resource_id: discussion?.resource_id || workspace?.id,
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2).max(60).required(),
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
              
              <div className="form-group">
                <Form.Item
                  className="form-group-constraint"
                  name='discussion_category_id'
                >
                  <FormDiscussionCategorySelect
                    name="discussion_category_id"
                    workspace_id={workspace?.id || discussion?.resource_id || 0}
                  />
                </Form.Item>
                <Form.Item
                  className="form-group-expanded"
                  name='name'
                >
                  <Input name="name" placeholder={t('form.discussion.name.placeholder')} />
                </Form.Item>
              </div>


              {!discussion?.id && <Form.Item label={t('form.discussion.description.label')} name='description'>
                <TextArea name="description" />
              </Form.Item>}

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

export default EmbedDiscussionForm