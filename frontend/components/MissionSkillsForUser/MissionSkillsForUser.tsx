import React from 'react';
import { Tag } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import fromPairs from 'lodash/fromPairs';
import sumBy from 'lodash/sumBy';
import SkillTag from '../../elements/SkillTag/SkillTag';


/**
 * This will represent how an user has a given skill
 */
enum SkillCompatibility {
  MANDATORY = 0,
  NONE = 1,
  LOW = 2,
  HIGH = 3,
}


interface Props {
  mission_skills: MissionSkill[]
  user_skills?: UserSkill[]
}

const MissionSkillsForUser = ({
  mission_skills,
  user_skills = [],
}: Props) => {

  const { t, language } = useLocale()

  const skillCompatibilityForMission = (s: MissionSkill) => {
    const uSkills = fromPairs(user_skills.map((us) => [us.skill_id, us.level]))

    if (uSkills[s.skill_id] === undefined) {
      return s.mandatory ? SkillCompatibility.MANDATORY : SkillCompatibility.NONE
    }

    return (uSkills[s.skill_id] >= s.level ? SkillCompatibility.HIGH : SkillCompatibility.LOW)
  }

  const renderMissionSkillTag = (s: MissionSkill & { compatibility: SkillCompatibility}) => {

    if (user_skills.length === 0) {
      return <Tag key={s.skill_id}>{s.name}</Tag>
    }

    return <SkillTag key={s.skill_id} {...s} />
  }

  const computedSkills = mission_skills.map(e => {
    return { ...e, compatibility: skillCompatibilityForMission(e) }
  }).sort((a, b) => b.compatibility - a.compatibility)

  const score = (sumBy(computedSkills, 'compatibility') * 3 * mission_skills.length) / 100
  return (
    
    <div className="MissionSkillsForUser">
      {mission_skills.length === 0 && <p className="text-light">{t('mission_user.no-skills-warning')}</p>}
      <div>{computedSkills.map((s) => {
        return renderMissionSkillTag(s)
      })}
      </div>
    </div>
  )

}

export default MissionSkillsForUser