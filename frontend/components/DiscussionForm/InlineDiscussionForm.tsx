import React, { useContext, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/discussion';
import { errorsFromResponse } from 'utils/forms/helpers';
import { Form, Input, Select } from 'formik-antd'
import YupWithLocale from 'utils/forms/yup';
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import icons from 'dictionaries/icons';
import { Tooltip, Button } from 'antd';
import { useLocale } from 'hooks/useLocale';
import Router from 'next/router';
import routes from 'routes/routes'
import TextArea from 'elements/TextArea/TextArea';
import FormDiscussionCategorySelect from '../DiscussionCategorySelect/DiscussionCategorySelect';
import classNames from 'classnames';
import EmbedDiscussionForm from './EmbedDiscussionForm';

interface Props {
  discussion?: Discussion
  workspace?: LightWorkspace
  redirectOnSave?: string
}

const InlineDiscussionForm = (props: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const [active, setActive] = useState(false)

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }
  

  return (<>
    <div className={classNames("InlineDiscussionTrigger", {active: !active} )}>
      <p onClick={() => setActive(true)}>{t('form.discussion.inline-add')}</p>
    </div>
    <div className={classNames("InlineDiscussionForm", { active } )}>
      <EmbedDiscussionForm {...props} />
      <Button type="link" onClick={() => setActive(false)}>{t('form.cancel')}</Button>
    </div>
  </>)
}

export default InlineDiscussionForm