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
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import MessageBox from 'elements/MessageBox/MessageBox';
import { queryCache } from 'react-query';

interface Props {
  poll?: Poll
  workspace_id?: number
  discussion?: LightDiscussion
  onSave?: () => void
}

const LightPollForm = ({
  poll,
  onSave,
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
    visibility: poll?.visibility || 'public',
    anonymity: poll?.anonymity || 'open',
    authentication: poll?.authentication || 'required',
    poll_type: poll?.poll_type,
    reveal: poll?.reveal || 'always',
    begin_at: poll?.begin_at,
    end_at: poll?.end_at ,
    workspace_id: poll?.workspace_id || workspace_id,
    poll_options_attributes: poll?.poll_options || [
      {name: t('form.poll.options.yes')},
      {name: t('form.poll.options.no')}
    ],
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
          // await check()
          queryCache.refetchQueries(['messages', { discussion_id: values.discussion_id}])

          return onSave && onSave()
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
{/*               
              {discussion && <div className="">
                <MessageBox>
                  <DiscussionItem discussion={discussion} />
                </MessageBox>
                <br />
              </div>} */}

              <Form.Item className="form-group-expanded"  label={t('form.poll.name.label')} name='name'>
                <Input prefix={<Tooltip title={t('form.poll.name.hint')}>
                  {icons.question}
                </Tooltip>} name="name" placeholder={t('form.poll.name.placeholder')} />
              </Form.Item>

              <Form.Item label={t('form.poll.options.label')} name='poll_options'>
                <ErrorMessage name="poll_options" />
                <PollOptionsSelect name="poll_options_attributes" />
              </Form.Item>
              <Form.Item label={t('form.poll.end_at.label')} name='end_at'>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  name="end_at"
                  placeholder={t('form.poll.end_at.placeholder')}
                  disabledDate={disabledEndDate}
                  // disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
                />
              </Form.Item>

              {/* <Form.Item name="end"> */}
                <SubmitButton
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                  block
                  submitCount={submitCount}
                  isValid={isValid}
                  label={values.id ? t('form.poll.update') : t('form.poll.submit') }
                />
              {/* </Form.Item> */}
            </Form>
        )}
    </Formik>
  </div>)
}

export default LightPollForm