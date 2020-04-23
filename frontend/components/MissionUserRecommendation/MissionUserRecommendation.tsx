import React from 'react';
import { Typography, Avatar, Steps, Space, Progress } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import routes from '../../routes/manage'
const { Title } = Typography;

const { explore } = routes

interface Props {
  mission_user: MissionUser
}

const MissionUserRecommendation = ({ mission_user }: Props) => {

  const { t } = useLocale()

  const level = Math.floor(mission_user.match_score / 20)

  return (
  <div>
    <p>{t(`mission_user.recommendations.${level}.title`)}.{' '}
    {/* {t('mission_user.recommended-at')}{' '}{' '}<Progress steps={5} percent={mission_user.match_score} strokeColor={t(`mission_user.recommendations.${level}.color`)} width={40} /> */}
    </p>
  </div>)
}

export default MissionUserRecommendation
