import React, { useContext } from 'react';
import find from 'lodash/find';
import { useLocale } from 'hooks/useLocale';
import UserContext from 'contexts/UserContext';

import MissionApplication from '../MissionApplication/MissionApplication';
import MissionCandidateBox from '../MissionCandidateBox/MissionCandidateBox';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';

import PageSection from 'elements/PageSection/PageSection';
import can from 'utils/can';
import List from 'elements/List/List';
import MissionUserItem from '../MissionUserItem/MissionUserItem';
import MarkdownContent from 'elements/MarkdownContent/MarkdownContent';
import LinkedItem from 'components/LinkedItem/LinkedItem';



interface Props extends Mission {}

const WorkspaceMissionDetail = (mission: Props) => {

  const {
    id,
    description,
    workspace_id,
    discussion,
    mission_users,
    mission_skills,
  } = mission

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  const application = currentUser && find(currentUser?.mission_users, { mission_id: id }) || null

  const mandatorySkills = mission_skills.filter(ms => ms.mandatory === true)
  const recommendedSkills = mission_skills.filter(ms => ms.mandatory === false)

  return (
    <div className="WorkspaceMissionDetail">

      {discussion && <PageSection type='default' className="discussion-margin">
        <LinkedItem type='discussion' linked={discussion} key={discussion.id} />
      </PageSection>}

      <PageSection title={t('mission.summary')}>
        <MarkdownContent content={description} />
      </PageSection>
      
      {mandatorySkills.length > 0 && <PageSection title={t('mission.required-skills')}>
        <MissionSkillsForUser
          mission_skills={mandatorySkills}
          user_skills={currentUser?.user_skills}
        />
      </PageSection>}

      {recommendedSkills.length > 0 && <PageSection title={t('mission.recommended-skills')}>
        <MissionSkillsForUser
          mission_skills={recommendedSkills}
          user_skills={currentUser?.user_skills}
        />
      </PageSection>}

      <MissionCandidateBox />

      {(application || can(currentUser, 'mission.apply', mission)) && <PageSection>
        <MissionApplication application={application} mission={mission} />
      </PageSection>}

      {can(currentUser, 'mission_user.index', mission) && <PageSection title={t('menu.contributors')}>
        <List
          emptyText={t('mission_user.empty')}
          dataSource={mission_users}
          renderItem={(mu: LightMissionUser) => <MissionUserItem activeMission={mission.id} {...mu} />}
        />
      </PageSection>}

    </div>
  )

}

export default WorkspaceMissionDetail