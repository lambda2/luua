import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/discussion_category';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import { useLocale } from 'hooks/useLocale';
import Router, { useRouter } from 'next/router';
import routes from 'routes/routes'
import MessageBox from 'elements/MessageBox/MessageBox';
import DiscussionCategoryBadge from 'elements/DiscussionCategoryBadge/DiscussionCategoryBadge';
import WorkspaceContext from 'contexts/WorkspaceContext';

interface Props {
  discussion_category?: DiscussionCategory
  onSave?: () => void
}

const DiscussionCategoryForm = ({ discussion_category, onSave }: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { currentWorkspace } = useContext(WorkspaceContext)

  const { t } = useLocale()
  const Yup = YupWithLocale()
  const { query } = useRouter()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: discussion_category?.id,
    workspace_id: currentWorkspace?.id || discussion_category?.workspace_id || (query.workspace_id && parseInt(query.workspace_id as string)) || 0,
    name: discussion_category?.name || t('form.discussion_category.name.placeholder'),
    color: discussion_category?.color || t('form.discussion_category.color.placeholder'),
    icon: discussion_category?.icon || t('form.discussion_category.icon.placeholder'),
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string(),
    color: Yup.string(),
    icon: Yup.string()
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
  <div className="DiscussionCategoryForm">
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await createOrUpdate(values, currentUser.jwt)
          console.log("After save: ", { data });
          await check()
          if (onSave) {
            onSave()
          } else {
            const dest = routes.manage.workspace.show(`${query.workspace_id}`)
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
              
              <Form.Item label={t('form.discussion_category.name.label')} name='name'>
                <Input name="name" />
              </Form.Item>
              
              <Form.Item label={t('form.discussion_category.color.label')} name='color'>
                <Input name="color" type="color"/>
              </Form.Item>
              
              <Form.Item label={t('form.discussion_category.icon.label')} name='icon'>
                <Input name="icon" />
              </Form.Item>

              <Form.Item name="preview" label={t('generics.preview')}>
                <DiscussionCategoryBadge text category={values as unknown as DiscussionCategory} />
              </Form.Item>

              <br />
              <SubmitButton
                isSubmitting={isSubmitting}
                dirty={dirty}
                block
                submitCount={submitCount}
                isValid={isValid}
                label={t('form.discussion_category.submit', { name: (values.name)})}
              />
            </Form>
        )}
    </Formik>
  </div>)
}

export default DiscussionCategoryForm