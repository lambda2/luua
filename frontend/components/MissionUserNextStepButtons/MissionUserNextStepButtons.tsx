import React from 'react';
import { Typography, Avatar, Steps, Space, Progress, Button } from 'antd';
import { useLocale } from 'hooks/useLocale';
import routes from 'routes/routes'
import PrimaryLink from 'elements/PrimaryLink/PrimaryLink';
const { Title } = Typography;

const { explore } = routes

interface Props {
  mission_user: MissionUser
  onAccept: () => {}
  onReject: () => {}
  onComplete: () => {}
  onReview: () => {}
}

const MissionUserNextStepButtons = ({
  mission_user,
  onAccept,
  onReject,
  onComplete,
  onReview
}: Props) => {

  const { t } = useLocale()

  const { status } = mission_user

  const tree = {
    "applied": [
      <Button onClick={onAccept} key="accept" type="primary">{t(`mission_user.accepted.button`)}</Button>,
      <Button onClick={onReject} key="reject" color="red" type="default">{t(`mission_user.rejected.button`)}</Button>
    ],
    "rejected": [

    ],
    "canceled": [

    ],
    "accepted": [
      <Button onClick={onComplete} key="complete" type="primary">{t(`mission_user.completed.button`)}</Button>
    ],
    "completed": [
      <Button onClick={onReview} key="review" type="primary">{t(`mission_user.reviewed.button`)}</Button>
    ],
    "reviewed": [

    ],
  }
  return (
  <>
    <Space>
      {tree[status]}
    </Space>
  </>)
}

export default MissionUserNextStepButtons
