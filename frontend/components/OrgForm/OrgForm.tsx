import React, { useContext } from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import UserContext from 'contexts/UserContext';
import { createOrUpdate } from 'api/organisation';
import RegionSelect from '../RegionSelect/RegionSelect';
import CountrySelect from '../CountrySelect/CountrySelect';
import { errorsFromResponse } from 'utils/forms/helpers';
import Router from 'next/router';

interface Props {
  org?: Organization
}

const OrgnForm = (props: Props) => {

  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const initialValues = {
    name: '',
    description: '',
    country_id: undefined,
    region_id: undefined,
    organization_type: '',
    image: '',
    globalErrors: undefined,
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required(),
    region_id: Yup.number().required('Please select a region'),
    description: Yup.string().min(5, 'Too short'),
    image: Yup.string(),
  });

  return (
  <div>
    <Formik
      initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await createOrUpdate(values, currentUser.jwt)
            console.log("After save: ", { data });
            Router.push('/orgs/[id]', `/orgs/${data.slug}`, { shallow: true })
          } catch (error) {
            setErrors(errorsFromResponse(error.response))
          }
        }
      }
      validationSchema={EditSchema}
    >
        {({ values, setFieldValue, isSubmitting, dirty, submitCount }) => (
            <Form>
            <ErrorMessage name="globalErrors" />
            <div className="field">
              <Field name="organization_type" placeholder="organization type" as="select">
                <option value="company">company</option>
                <option value="individual">individual</option>
                <option value="association">association</option>
                <option value="ngo">ngo</option>
              </Field>
              <ErrorMessage name="organization_type" />
              </div>
              <div className="field">
                <RegionSelect
                  name="region_id"
                  value={values.region_id}
                  onChange={(id: number) => {
                    setFieldValue('region_id', id)
                    setFieldValue('country_id', null)
                  }}
                  regions={[]}
                />
                <ErrorMessage name="region_id" />
              </div>
              <div className="field">
                <CountrySelect
                  name="country_id"
                  value={values.country_id}
                  region_id={values.region_id}
                  isDisabled={!values.region_id}
                  onChange={(id: number) => setFieldValue('country_id', id)}
                />
                <ErrorMessage name="country_id" />
              </div>
              <div className="field">
                <Field name="name" placeholder="name" />
                <ErrorMessage name="name" />
              </div>
              <div className="field">
                <Field name="image" placeholder="image" />
                <ErrorMessage name="image" />
              </div>
              <div className="field">
                <Field name="description" placeholder="description" />
                <ErrorMessage name="description" />
              </div>
              {/* <div className="field">
                <Field name="country_id" as="select">
                  <option value="company">company</option>
                  <option value="individual">individual</option>
                  <option value="association">association</option>
                  <option value="ngo">ngo</option>
                </Field>
                <ErrorMessage name="country_id" />
              </div> */}
              <button type="submit" disabled={isSubmitting || !dirty}>
                  {isSubmitting ? 'Submitting' : (dirty ? 'Save your changes' : (submitCount > 0 ? 'Saved' : 'Save'))}
              </button>
            </Form>
        )}
    </Formik>
  </div>)
}

// OrgnForm.getInitialProps = (ctx) => {
// }

export default OrgnForm