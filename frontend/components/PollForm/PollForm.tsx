import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/poll';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input, Select, Radio, DatePicker } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import icons from 'dictionaries/icons';
import { Tooltip } from 'antd';
import { useLocale } from 'hooks/useLocale';
import Router from 'next/router';
import routes from 'routes/routes'
import TextArea from 'elements/TextArea/TextArea';
import FormDiscussionCategorySelect from '../DiscussionCategorySelect/DiscussionCategorySelect';
import PollOptionsSelect from 'components/PollOptionsSelect/PollOptionsSelect';
import momentWithLocale from 'i18n/moment';
import PageSection from 'elements/PageSection/PageSection';
import discussion from 'pages/manage/[workspace_id]/missions/[id]/discussion';
import Discussion from 'components/Discussion/Discussion';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import MessageBox from 'elements/MessageBox/MessageBox';

interface Props {
  poll?: Poll
  workspace_id?: number
  discussion?: LightDiscussion
  redirectOnSave?: string
}

const PollForm = ({
  poll,
  redirectOnSave,
  discussion,
  workspace_id
}: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)
  const Yup = YupWithLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    id: poll?.id,
    name: poll?.name || discussion?.name || '',
    discussion_category_id: poll?.discussion_category?.id?.toString() || discussion?.discussion_category?.id.toString(),
    description: poll?.description || '',
    discussion_id: poll?.discussion_id || discussion?.id || '',
    visibility: poll?.visibility || 'draft',
    anonymity: poll?.anonymity || 'open',
    authentication: poll?.authentication || 'required',
    poll_type: poll?.poll_type,
    reveal: poll?.reveal || 'on_close',
    begin_at: poll?.begin_at,
    end_at: poll?.end_at ,
    workspace_id: poll?.workspace_id || workspace_id,
    poll_options_attributes: poll?.poll_options || [],
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2).required(),
    description: Yup.string(),
  });

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment()
  }

  const disabledEndDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day') && current < moment(poll?.begin_at || '');
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
              
              {discussion && <div className="">
                <MessageBox>
                  <DiscussionItem discussion={discussion} />
                </MessageBox>
                <br />
              </div>}

              <div className="form-group">
                <Form.Item className="form-group-constraint" label={t('form.poll.discussion_category_id.label')} name='discussion_category_id'>
                  <FormDiscussionCategorySelect
                    name="discussion_category_id"
                    workspace_id={workspace_id || poll?.workspace_id || 0}
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

              <Form.Item label={t('form.poll.options.label')} name='poll_options'>
                <ErrorMessage name="poll_options" />
                <PollOptionsSelect name="poll_options_attributes" />
              </Form.Item>

              <Form.Item label={t('form.mission.begin_at.label')} name='begin_at'>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  name="begin_at"
                  placeholder={t('form.mission.begin_at.placeholder')}
                  disabledDate={disabledDate}
                  // disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
                />
              </Form.Item>
              <Form.Item label={t('form.mission.end_at.label')} name='end_at'>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  name="end_at"
                  placeholder={t('form.mission.end_at.placeholder')}
                  disabledDate={disabledEndDate}
                  // disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
                />
              </Form.Item>
              
              <div className="big-radio-group">
                <Form.Item label={t('form.poll.visibility.label')} name='visibility'>
                  <span className="hint">{t('form.poll.visibility.hint')}{' '}</span>
                  <Radio.Group name={'visibility'}>
                    <Radio name={'visibility'} value={'draft'}>
                      <b>{t('form.poll.visibility.options.draft.title')}</b>
                      <p>{t('form.poll.visibility.options.draft.description')}</p>
                    </Radio>
                    <Radio name={'visibility'} value={'private'}>
                      <b>{t('form.poll.visibility.options.private.title')}</b>
                      <p>{t('form.poll.visibility.options.private.description')}</p>
                    </Radio>
                    <Radio name={'visibility'} value={'protected'}>
                      <b>{t('form.poll.visibility.options.protected.title')}</b>
                      <p>{t('form.poll.visibility.options.protected.description')}</p>
                    </Radio>
                    <Radio name={'visibility'} value={'public'}>
                      <b>{t('form.poll.visibility.options.public.title')}</b>
                      <p>{t('form.poll.visibility.options.public.description')}</p>
                    </Radio>
                  </Radio.Group>

                  </Form.Item>
              </div>


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