import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import UserContext from '../../contexts/UserContext';
import api, { getHeaders } from '../../utils/http';
import UserSkillsSelect from '../../elements/UserSkillsSelect/UserSkillsSelect';
import { Form } from 'formik-antd';
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import { useLocale } from '../../hooks/useLocale';
import { errorsFromResponse } from '../../utils/forms/helpers';
import Router from 'next/router';



const SkillsForm = () => {

  const { currentUser, update, check } = useContext(UserContext)
  const { t } = useLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  return (
  <div>
    <Formik
      initialValues={{
        user_skills_attributes: currentUser.user_skills,
        globalErrors: undefined
      }}
      onSubmit={async (values, { setErrors, setValues }) => {
        try {
          const data = await update(values)
          console.log("After save: ", { data });
          setValues({ ...values, user_skills_attributes: (data?.user_skills || []) })
          check()
        } catch (error) {
          setErrors(errorsFromResponse(error.response))
        }
      }}
    >
      {({
        values,
        isValid,
        isSubmitting,
        dirty,
        submitCount,
        setFieldValue,
      }) => (
          <Form layout="vertical">
            <ErrorMessage name="globalErrors" />

            <UserSkillsSelect
              addLabel={t('form.skill.add-skill')}
              name="user_skills_attributes"
            />

            <br />
            <br />
            <SubmitButton
              isSubmitting={isSubmitting}
              dirty={dirty}
              submitCount={submitCount}
              isValid={isValid}
              label={t('form.user.skills.submit')}
            />
          </Form>
        )}
    </Formik>
  </div>)
}


export default SkillsForm