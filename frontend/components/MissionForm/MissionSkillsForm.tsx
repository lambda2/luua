import React, { useContext, useState } from 'react';
import { Form, Input, ResetButton, Select, Switch } from 'formik-antd'
import SubmitButton from 'elements/SubmitButton/SubmitButton';
import { Steps, Button } from 'antd';
import MissionSkillsSelect from 'elements/MissionSkillsSelect/MissionSkillsSelect';
import { useLocale } from 'hooks/useLocale';

const { TextArea } = Input;

interface Props {
  mission?: Mission
}

const MissionSkillsForm = ({ mission }: Props) => {

  const { t } = useLocale()
  
  return (
    <div className="MissionSkillsForm">
      <Form.Item name='mission_skills_attributes' label={t('form.skill.label')}>
        <MissionSkillsSelect
          addLabel={t('form.skill.add-skill')}
          name="mission_skills_attributes"
        />
      </Form.Item>
  </div>)
}

export default MissionSkillsForm