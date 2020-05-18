import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/poll';
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
import PollOptionsSelect from 'elements/MissionSkillsSelect/PollOptionSelect';

interface Props {
  poll?: Poll
  workspace?: LightWorkspace
  discussion?: LightDiscussion
  redirectOnSave?: string
}

const PollForm = ({
  poll,
  redirectOnSave,
  workspace
}: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const Yup = YupWithLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: poll?.id,
    name: poll?.name || '',
    discussion_category_id: poll?.discussion_category?.id?.toString(),
    description: poll?.description || '',
    workspace_id: poll?.workspace_id || workspace?.id,
    poll_options_attributes: poll?.poll_options || [],
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
            const dest = routes.manage.workspace.polls.show(data.workspace_id, data.slug)
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
                <Form.Item className="form-group-constraint" label={t('form.poll.discussion_category_id.label')} name='discussion_category_id'>
                  <FormDiscussionCategorySelect
                    name="discussion_category_id"
                    workspace_id={workspace?.id || poll?.workspace_id || 0}
                  />
                </Form.Item>
                <Form.Item className="form-group-expanded"  label={t('form.poll.name.label')} name='name'>
                  <Input prefix={<Tooltip title={t('form.poll.name.hint')}>
                    {icons.question}
                  </Tooltip>} name="name" placeholder={t('form.poll.name.placeholder')} />
                </Form.Item>
              </div>

              <Form.Item label={t('form.poll.description.label')} name='description'>
                <TextArea name="description" />
              </Form.Item>

              <Form.Item label={t('form.poll.options.label')} name='options'>
                <PollOptionsSelect name="poll_options_attributes" />
              </Form.Item>

              <Form.Item name="end">
                <SubmitButton
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                  submitCount={submitCount}
                  isValid={isValid}
                  label={values.id ? t('form.poll.update') : t('form.poll.submit') }
                />
              </Form.Item>
            </Form>
        )}
    </Formik>
  </div>)
}

export default PollForm