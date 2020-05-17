import React, { useContext } from 'react';
import { Space } from 'antd';
import { useLocale } from 'hooks/useLocale';
import PageSection from 'elements/PageSection/PageSection';
import PageTitle from 'elements/PageTitle/PageTitle';
import UserAvatar from 'elements/UserAvatar/UserAvatar';
import CandidateStatusStep from 'elements/CandidateStatusStep/CandidateStatusStep';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';
import MissionUserRecommendation from '../MissionUserRecommendation/MissionUserRecommendation';
import MissionUserNextStepButtons from '../MissionUserNextStepButtons/MissionUserNextStepButtons';
import { nameForUser } from 'utils/user';
import UserContext from 'contexts/UserContext';
import { accept, reject, complete, review } from 'api/mission_user';
import { AxiosResponse } from 'axios';
import WorkspaceContext from 'contexts/WorkspaceContext';

interface Props {
  mission_user: MissionUser,
  refetch?: (opts?: any) => Promise<MissionUser>
}

const MissionUserShow = ({ mission_user, refetch }: Props) => {

  const { t } = useLocale()
  const {
    user,
    mission,
    status,
    mission_skills,
    user_skills
  } = mission_user
  const { currentUser } = useContext(UserContext)
  const { fetchWorkspace } = useContext(WorkspaceContext)

  const onAction = async (executeCallback: (mission_user_id: any, token: string) => Promise<AxiosResponse<MissionUser>>) => {
    const response = await executeCallback(mission_user.id, currentUser?.jwt || '')
    fetchWorkspace(mission_user.mission.workspace_id)
    refetch && refetch()
  }

  return (
  <>
    <PageTitle
      title={<>
        <UserAvatar
          name={user.username}
          size="default"
          src={user.thumb_url}
        />
        {' '}
        {nameForUser(user)}
      </>}
    >
    </PageTitle>

    <CandidateStatusStep mission_user={mission_user} />

    <PageSection title={t('mission_user.titles.folder')}>
      <Space>
        {/* @TODO profile link */}
        {/* <PrimaryLink {...explore.index()}>{t('mission_user.links.see-profile')}</PrimaryLink> */}
      </Space>

      <p>{t(`mission_user.${status}.state`, {name: `"${mission.name}"`})}</p>
      <MissionUserRecommendation mission_user={mission_user} />
      {' '}
      <MissionUserNextStepButtons
        mission_user={mission_user}
        onAccept={() => onAction(accept)}
        onReject={() => onAction(reject)}
        onComplete={() => onAction(complete)}
        onReview={() => onAction(review)}
      />
    </PageSection>

    <PageSection title={t('mission_user.titles.skills')}>
      <MissionSkillsForUser
        mission_skills={mission_skills}
        user_skills={user_skills}
      />

    </PageSection>


  </>)
}

export default MissionUserShow
