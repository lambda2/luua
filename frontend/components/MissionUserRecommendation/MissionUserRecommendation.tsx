import React from 'react';
import { useLocale } from 'hooks/useLocale';

interface Props {
  mission_user: MissionUser
}

const MissionUserRecommendation = ({ mission_user }: Props) => {

  const { t } = useLocale()

  const level = Math.floor(mission_user.match_score / 20)

  return (
  <div>
    {mission_user.mission.skills.length === 0 &&
      <p>{t(`mission_user.no-skills-warning`)}</p> ||
      <p>{t(`mission_user.recommendations.${level}.title`)}.</p>}
  </div>)
}

export default MissionUserRecommendation
