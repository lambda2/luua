import React from 'react';
import { Form, Slider, Radio } from 'formik-antd'
import { useLocale } from '../../hooks/useLocale';

interface Props {
  mission?: Mission
}

const MissionPeopleForm = ({ mission }: Props) => {

  const { t, language } = useLocale()

  function formatter(value: number) {
    if (value === 0) {
      return t('form.mission.participant_count.as-many-as-possible')
    }
    return `${value} ${t('form.mission.participant_count.participant')}${value > 1 ? 's' : ''}`;
  }

  const marks = {
    0: '∞',
    10: `10`,
    100: `100`
  };

  return (
    <div className="MissionPeopleForm">
      <Form.Item label={t('form.mission.participant_count.label')} name='participant_count'>
        <span className="hint">{t('form.mission.participant_count.hint')}{' '}</span>
        <Slider
          marks={marks}
          tooltipVisible
          name="participant_count"
          tipFormatter={formatter}
          defaultValue={1}
        />

      </Form.Item>
      <Form.Item label={t('form.mission.hiring_validation.label')} name='hiring_validation'>
        <span className="hint">{t('form.mission.hiring_validation.hint')}{' '}</span>
        <Radio.Group name={'hiring_validation'}>
          <Radio name={'hiring_validation'} value={'review'}>
            <h3>{t('form.mission.hiring_validation.options.review.title')}</h3>
            <p>{t('form.mission.hiring_validation.options.review.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'trusted'}>
            <h3>{t('form.mission.hiring_validation.options.trusted.title')}</h3>
            <p>{t('form.mission.hiring_validation.options.trusted.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'requirements'}>
              <h3>{t('form.mission.hiring_validation.options.requirements.title')}</h3>
              <p>{t('form.mission.hiring_validation.options.requirements.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'accept_all'}>
            <h3>{t('form.mission.hiring_validation.options.accept_all.title')}</h3>
            <p>{t('form.mission.hiring_validation.options.accept_all.description')}</p>
          </Radio>
        </Radio.Group>

      </Form.Item>
    </div>)
}

export default MissionPeopleForm