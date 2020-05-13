// import { Upload, message } from 'antd';
// import { useState } from 'react';
// import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { useState, ChangeEvent, ReactNode } from "react";

// import './UserSkillsSelect.module.less'
import { List, Tag } from "antd";
import { useField } from "formik";
import UserSkillsModal from "./UserSkillsModal";
import icons from "../../dictionaries/icons";
import { useLocale } from "../../hooks/useLocale";


interface UserSkill {
  skill_id: number
  category: SkillCategory
  id?: number
  level?: number
  name?: string,
  _destroy?: boolean
}

interface Props {
  addLabel?: string,
  modalLabel?: string,
  name: string,
}

const UserSkillsSelect = ({
  modalLabel,
  addLabel,
  name,
  ...props
}: Props) => {

  const { t } = useLocale()
  const [field, meta, helpers] = useField <UserSkill[]>(name);

  const { value } = meta;
  const { setValue } = helpers;

  const deleteSkill = (skill: UserSkill) => {
    if (skill.id) {
      setValue([
        ...value.filter(e => e.id !== skill.id),
        {...skill, ...{ _destroy: true }}
      ])
    } else {
      setValue(value.filter(e => e.skill_id !== skill.skill_id))
    }
  }

  const handleOk = (e: UserSkill) => {
    setValue([...value, e])
  };

  const handleCancel = (e: any) => {
  };

  return (
    <div className="UserSkillsSelect">
      <div className="skills-wrapper">

        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
        <div className="skill-select-item-list">

          {value.filter(e => !e._destroy).map((item: UserSkill) => {
            return (<div key={item.skill_id} className="skill-select-item">
              <main>
                {item.category !== 'mobility' && <span>
                  {t(`form.skill.levels.${item.category}.${item.level}`)}{' '}
                  {t('form.skill.in-level')}{' '}
                </span>}
                {item.name}
              </main>
              <aside>
                <span key="delete" onClick={() => deleteSkill(item)}>{icons.delete}</span>
              </aside>
            </div>)
          })}
          <UserSkillsModal
            title={modalLabel || t('form.skill.modal.title')}
            addLabel={addLabel || t('form.skill.add-skill')}
            onOk={handleOk}
            onCancel={handleCancel}
            selected={value.map(e => e.skill_id)}
          />
        </div>
      </div>
    </div>
  );
}

export default UserSkillsSelect