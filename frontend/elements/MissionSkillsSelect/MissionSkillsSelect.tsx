// import { Upload, message } from 'antd';
// import { useState } from 'react';
// import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { useState, ChangeEvent, ReactNode } from "react";

import './MissionSkillsSelect.module.less'
import { List, Tag } from "antd";
import { useField } from "formik";
import MissionSkillsModal from "./MissionSkillsModal";
import icons from "../../dictionaries/icons";
import { useLocale } from "../../hooks/useLocale";


interface MissionSkill {
  skill_id: number
  category: SkillCategory
  id?: number
  level?: number
  name?: string,
  mandatory?: boolean,
  _destroy?: boolean,
  icon?: string,
}

interface Props {
  addLabel?: string,
  modalLabel?: string,
  name: string,
}

const MissionSkillsSelect = ({
  modalLabel,
  addLabel,
  name,
  ...props
}: Props) => {

  const { t } = useLocale()
  const [field, meta, helpers] = useField <MissionSkill[]>(name);

  const { value } = meta;
  const { setValue } = helpers;

  const deleteSkill = (skill: MissionSkill) => {
    if (skill.id) {
      setValue([
        ...value.filter(e => e.id !== skill.id),
        {...skill, ...{ _destroy: true }}
      ])
    } else {
      setValue(value.filter(e => e.skill_id !== skill.skill_id))
    }
  }

  const handleOk = (e: MissionSkill) => {
    setValue([...value, e])
  };

  const handleCancel = (e: any) => {
  };

  return (
    <div className="MissionSkillsSelect">
      <div className="skills-wrapper">
        <List
          itemLayout="horizontal"
          dataSource={value.filter(e => !e._destroy)}
          locale={{ emptyText: t('form.skill.empty') }}
          renderItem={item => (
            <List.Item key={item.skill_id}
              actions={[
                <span key="delete" onClick={() => deleteSkill(item)}>{icons.delete}</span>
              ]}
            >
              <List.Item.Meta
                title={<p>
                  <Tag>
                    {t('form.skill.skill')}{' '}
                    {t(`form.skill.${item.mandatory ? 'yes' : 'no'}`)}
                  </Tag>{' '}
                  {t(`form.skill.levels.${item.category}.${item.level}`)}{' '}
                  {t('form.skill.in-level')}{' '}
                  {item.name}
                </p>}
              />
            </List.Item>
          )}
        />
        <hr />
        <MissionSkillsModal
          title={modalLabel || t('form.skill.modal.title')}
          addLabel={addLabel || t('form.skill.add-skill')}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MissionSkillsSelect