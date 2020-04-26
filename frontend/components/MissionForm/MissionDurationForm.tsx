import React from 'react';
import { Form, Input, DatePicker } from 'formik-antd'
import { useLocale } from '../../hooks/useLocale';
import momentWithLocale from '../../i18n/moment';
import { useField } from 'formik';
import { Button } from 'antd';

const { TextArea } = Input;

interface Props {
  mission?: Mission
}

const MissionDurationForm = ({ mission }: Props) => {

  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const [beginAtField, beginAtMeta, beginAtHelpers] = useField<string | undefined>('begin_at');
  const beginAt = beginAtMeta.value;

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment()
  }
  
  const disabledEndDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day') && current < moment(beginAt || '');
  }

  return (
  <div className="MissionDurationForm">
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
  </div>)
}

export default MissionDurationForm