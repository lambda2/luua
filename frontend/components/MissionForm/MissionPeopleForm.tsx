import React from 'react';
import { Form, Slider, Radio } from 'formik-antd'
import { useLocale } from 'hooks/useLocale';

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
    <div className="big-radio-group">
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
      
      {/* @TODO later */}
      {/* <Form.Item label={t('form.mission.hiring_validation.label')} name='hiring_validation'>
        <span className="hint">{t('form.mission.hiring_validation.hint')}{' '}</span>
        <Radio.Group name={'hiring_validation'}>
          <Radio name={'hiring_validation'} value={'review'}>
            <b>{t('form.mission.hiring_validation.options.review.title')}</b>
            <p>{t('form.mission.hiring_validation.options.review.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'trusted'}>
            <b>{t('form.mission.hiring_validation.options.trusted.title')}</b>
            <p>{t('form.mission.hiring_validation.options.trusted.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'requirements'}>
              <b>{t('form.mission.hiring_validation.options.requirements.title')}</b>
              <p>{t('form.mission.hiring_validation.options.requirements.description')}</p>
          </Radio>
          <Radio name={'hiring_validation'} value={'accept_all'}>
            <b>{t('form.mission.hiring_validation.options.accept_all.title')}</b>
            <p>{t('form.mission.hiring_validation.options.accept_all.description')}</p>
          </Radio>
        </Radio.Group>

      </Form.Item> */}

      <Form.Item label={t('form.mission.visibility.label')} name='visibility'>
        <span className="hint">{t('form.mission.visibility.hint')}{' '}</span>
        <Radio.Group name={'visibility'}>
          <Radio name={'visibility'} value={'draft'}>
            <b>{t('form.mission.visibility.options.draft.title')}</b>
            <p>{t('form.mission.visibility.options.draft.description')}</p>
          </Radio>
          <Radio name={'visibility'} value={'private'}>
            <b>{t('form.mission.visibility.options.private.title')}</b>
            <p>{t('form.mission.visibility.options.private.description')}</p>
          </Radio>
          <Radio name={'visibility'} value={'protected'}>
            <b>{t('form.mission.visibility.options.protected.title')}</b>
            <p>{t('form.mission.visibility.options.protected.description')}</p>
          </Radio>
          <Radio name={'visibility'} value={'public'}>
              <b>{t('form.mission.visibility.options.public.title')}</b>
              <p>{t('form.mission.visibility.options.public.description')}</p>
          </Radio>
        </Radio.Group>

      </Form.Item>
    </div>)
}

export default MissionPeopleForm