import React, { useContext, useState } from 'react';
import { ErrorMessage, Formik, FormikErrors } from 'formik';
import YupWithLocale from '../../utils/forms/yup';
import UserContext from '../../contexts/UserContext';
import { createOrUpdate } from '../../api/mission';
import { errorsFromResponse } from '../../utils/forms/helpers';
import { Form } from 'formik-antd'
import SubmitButton from '../../elements/SubmitButton/SubmitButton';
import { Steps, Button, Typography, message } from 'antd';
// import './MissionForm.module.less'
import MissionInfoForm from './MissionInfoForm';
import MissionSkillsForm from './MissionSkillsForm';
import pick from 'lodash/pick';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import Router from 'next/router';
import MissionDurationForm from './MissionDurationForm';
import MissionPeopleForm from './MissionPeopleForm';
import PageTitle from '../../elements/PageTitle/PageTitle';
const { manage } = routes
const { workspace } = manage

const { Step } = Steps;
const { Title } = Typography;

interface Props {
  mission?: Mission
}

const MissionForm = ({ mission }: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
  
  const [step, setStep] = useState<number>(0)

  const Yup = YupWithLocale()

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const missionToValues = (mission?: Mission) => {
    return {
      id: mission?.id,
      name: mission?.name || '',
      physical: mission?.physical || false,
      mission_skills_attributes: mission?.mission_skills || [],
      description: mission?.description || '',
      begin_at: mission?.begin_at || '',
      end_at: mission?.end_at || '',
      due_at: mission?.due_at || '',
      workspace_id: mission?.workspace_id || currentUser.workspaces.length > 0 ? currentUser.workspaces[0].id : undefined,
      image: mission?.image || '',
      banner_image: mission?.banner_image || '',
      visibility: mission?.visibility || 'draft',
      hiring_validation: mission?.hiring_validation || 'review',
      participant_count: mission?.participant_count || 1,
      globalErrors: undefined,
    }
  }

  const initialValues = missionToValues(mission)

  const EditSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required(),
    physical: Yup.boolean().required(),
    description: Yup.string().min(5, 'Too short'),
    begin_at: Yup.date().nullable(),
    end_at: Yup.date().nullable(),
    due_at: Yup.date().nullable(),
    workspace_id: Yup.number().required(),
    participant_count: Yup.number(),
    hiring_validation: Yup.string().required(),
    image: Yup.string(),
    banner_image: Yup.string(),
    visibility: Yup.string().required(),
  });

  const next = () => {
    setStep(step + 1)
  }

  const prev = () => {
    setStep(step -1)
  }

  const steps = [
    {
      title: t('form.mission.steps.infos'),
      content: <MissionInfoForm />,
      fields: ['name', 'description', 'physical'],
    },
    {
      title: t('form.mission.steps.skills'),
      content: <MissionSkillsForm />,
      fields: [],
    },
    {
      title: t('form.mission.steps.durations'),
      content: <MissionDurationForm />,
      fields: ['begin_at', 'end_at'],
    },
    {
      title: t('form.mission.steps.participants'),
      content: <MissionPeopleForm />,
      fields: ['participant_count'],
    },
  ];

  const isValidForStep = (errors: FormikErrors<any>, st: number) => {
    const { fields } = steps[st]
    const err = pick(errors, fields)
    return Object.keys(err).length === 0
  }

  const stepStatus = (item: number, errors: FormikErrors<any>): "wait" | "process" | "finish" | "error" | undefined => {
    if (step == item) {
      return 'process'
    } else if (item > step) {
      return 'wait'
    } else if (isValidForStep(errors, item)) {
      return 'finish'
    } else if (!isValidForStep(errors, item)) {
      return 'error'
    } else {
      return 'error'
    }
  }

  return (
    <div className="MissionForm">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors, setValues }) => {
          try {
            const { data } = await createOrUpdate(values, currentUser.jwt)

            if (step === steps.length - 1) {
              const dest = workspace.missions.show(data!.workspace_id, data.slug)
              // goto(workspace.missions.show(data!.workspace_id, data.slug), Router)
              Router.push(dest.href, dest.as)
            } else {
              // const dest = workspace.missions.edit(data!.workspace_id, data.slug)
              // Router.replace(dest.href, dest.as, {shallow: true})

              // message.success(t('form.mission.draft-saved'));
              setValues(missionToValues(data))
              next()
            }
          } catch (error) {
            setErrors(errorsFromResponse(error.response))
          }
        }}
        validationSchema={EditSchema}
      >
          {({
            values,
            errors,
            isValid,
            isSubmitting,
            dirty,
            submitCount
          }) => (
              <Form layout="vertical">
                <PageTitle title={mission?.id ? `${values.name || t('form.mission.edit')}` : t('form.mission.new')} />

                <ErrorMessage name="globalErrors" />

                <Steps
                  onChange={(s) => setStep(s)}
                  style={{ marginTop: 20, marginBottom: 40 }}
                  size="small"
                  current={step}
                >
                  {steps.map((item, n) => (
                    <Step status={stepStatus(n, errors)} key={item.title} title={item.title} />
                  ))}
                </Steps>

                <div className="steps-content">{steps[step].content}</div>

                <div className="steps-action">
                  {step > 0 && (
                    <Button style={{ margin: 8 }} onClick={() => prev()}>{t('form.mission.prev')}</Button>
                  )}
                  {step == 0 && (
                    <span></span>
                  )}
                  {step < steps.length - 1 && (
                    <Form.Item name="end">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        dirty={dirty}
                        submitCount={submitCount}
                        isValid={isValidForStep(errors, step)}
                        label={t('form.mission.next')}
                      />
                    </Form.Item>
                    // <Button disabled={!isValidForStep(errors, step)} type="primary" onClick={() => next()}>{t('form.mission.next')}</Button>
                  )}
                  {step === steps.length - 1 && (
                    <Form.Item name="end">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        dirty={dirty}
                        submitCount={submitCount}
                        isValid={isValid}
                        label={t('form.mission.submit')}
                      />
                    </Form.Item>
                  )}
                </div>
              </Form>
          )}
      </Formik>
    </div>
  )
}

export default MissionForm