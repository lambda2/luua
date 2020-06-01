import React from 'react';
import { Form, Input, Switch } from 'formik-antd'
import { useLocale } from 'hooks/useLocale';
import TextArea from 'elements/TextArea/TextArea';


interface Props {
  mission?: Mission
}

const MissionInfoForm = ({ mission }: Props) => {

  const { t } = useLocale()

  return (
  <div className="MissionInfoForm">
    <Form.Item label={t('form.mission.name.label')} name='name'>
      <span className="hint">{t('form.mission.name.hint')}{' '}</span>
      <Input name="name" placeholder={t('form.mission.name.placeholder')} />
    </Form.Item>
    <Form.Item label={t('form.mission.description.label')} name='description'>
      <span className="hint">{t('form.mission.description.hint')}{' '}</span>
      <TextArea name="description" />
    </Form.Item>

  </div>)
}

export default MissionInfoForm