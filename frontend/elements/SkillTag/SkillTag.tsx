import React from 'react'

import classNames from 'classnames';
// import './SkillTag.module.less'
import { Tag, Popover } from 'antd';
import { useLocale } from "../../hooks/useLocale";


/**
 * This will represent how an user has a given skill
 */
enum SkillCompatibility {
  MANDATORY = 0,
  NONE = 1,
  LOW = 2,
  HIGH = 3,
}

type compatibilityHash = [(key: SkillCompatibility) => string]

interface Props {
  name: string
  level: number
  mandatory: boolean
  category: SkillCategory
  compatibility: SkillCompatibility
}

/**
 * A tag for a skill
 */
 const SkillTag: React.FC<Props> = ({
  name,
  mandatory,
  level,
  category = 'technical',
  compatibility,
}) => {

  const { t } = useLocale()

  const colorsForCompatibility: any = {
    '0': 'red',
    '1': 'red',
    '2': 'orange',
    '3': 'green',
  }

  console.log({ name, mandatory, level, category, compatibility })

  const content = <div>
    <div>{t(`skill.compatibility.${compatibility}`, {name: name})}</div>
    <div>{t(`skill.asked-level`)}: {t(`form.skill.levels.${category}.${level}`)}</div>
  </div>

  return (
    <Popover content={content} title={name}>
      <Tag color={colorsForCompatibility[`${compatibility}`]}>
        {mandatory ? <b>{name}</b> : <span>{name}</span>}
      </Tag>
    </Popover>

    
  );
};

SkillTag.displayName = 'SkillTag'

export default SkillTag