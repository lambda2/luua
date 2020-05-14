import React, { useContext } from 'react';
import { ErrorMessage, Formik, useFormikContext } from 'formik';
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
import debounce from 'lodash/debounce';
import icons from '../../dictionaries/icons';

// Copied from https://github.com/jaredpalmer/formik/blob/e51f09a318cba216a1ba3932da0906202df0b979/examples/DebouncedAutoSave.js
const AutoSave = ({ debounceMs }: { debounceMs: number }) => {
  const formik = useFormikContext();
  const { t } = useLocale()

  const [lastSaved, setLastSaved] = React.useState(null);
  const debouncedSubmit = React.useCallback(
    debounce(
      () =>
        formik.submitForm().then(() => setLastSaved(new Date().toISOString() as any)),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  );

  React.useEffect(() => {
    debouncedSubmit();    
  }, [debouncedSubmit, formik.dirty]);

  return (
    <></>
  );

  // return (
  //   <>
  //     {!!formik.isSubmitting
  //       ? icons.loading
  //       : lastSaved !== null
  //         ? null
  //         : null}
  //   </>
  // );
};


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
      {({values}) => (
          <Form layout="vertical">

            <ErrorMessage name="globalErrors" />

            {values.user_skills_attributes.length === 0 && <p className="text-light">
              {t('skill.no-skills-yet.title')}
            </p>}

            <UserSkillsSelect
              addLabel={t('form.skill.add-skill')}
              name="user_skills_attributes"
            />
            <AutoSave debounceMs={300} />
          </Form>
        )}
    </Formik>
  </div>)
}


export default SkillsForm