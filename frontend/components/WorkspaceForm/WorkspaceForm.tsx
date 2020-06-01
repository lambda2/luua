import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/workspace';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input, Radio } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import icons from 'dictionaries/icons';
import { Tooltip } from 'antd';
import UploadAvatar from 'elements/UploadAvatar/UploadAvatar';
import { useLocale } from 'hooks/useLocale';
import Router from 'next/router';
import { cdnUrl } from 'utils/http';
import routes from 'routes/routes'
import TextArea from 'elements/TextArea/TextArea';
import { FormCountrySelect } from 'components/CountrySelect/CountrySelect';

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
    website: workspace?.website || null,
    country_id: workspace?.country_id ? `${workspace?.country_id}` : null,
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required(),
    image: Yup.string(),
    description: Yup.string(),
    country_id: Yup.string().nullable(),
    website: Yup.string().nullable(),
  });

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
            <Form layout="vertical" scrollToFirstError>
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

              <Form.Item label={t('form.workspace.website.label')} name='website'>
                <Input name="website" placeholder={t('form.workspace.website.placeholder')} />
              </Form.Item>

              <Form.Item label={t('form.workspace.country.label')} name='country_id'>
                <FormCountrySelect name="country_id" placeholder={t('form.workspace.country.placeholder')} />
              </Form.Item>

              <Form.Item className="big-radio-group" label={t('form.workspace.membership.label')} name='membership'>
                <span className="hint">{t('form.workspace.membership.hint')}{' '}</span>
                <Radio.Group name={'membership'}>
                  <Radio name={'membership'} value={'closed'}>
                    <div><b>{t('form.workspace.membership.options.closed.title')}</b></div>
                    <p>{t('form.workspace.membership.options.closed.description')}</p>
                  </Radio>
                  <Radio name={'membership'} value={'approval'}>
                    <div><b>{t('form.workspace.membership.options.approval.title')}</b></div>
                    <p>{t('form.workspace.membership.options.approval.description')}</p>
                  </Radio>
                  <Radio name={'membership'} value={'open'}>
                    <div><b>{t('form.workspace.membership.options.open.title')}</b></div>
                    <p>{t('form.workspace.membership.options.open.description')}</p>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="end">
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