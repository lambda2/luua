import React, { useContext } from 'react';
import { Avatar } from 'antd';
import Link from 'next/link';
import find from 'lodash/find';
import { Typography } from 'antd';

import { cdnUrl } from '../../utils/http';
import momentWithLocale from '../../i18n/moment';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';

import MissionApplication from '../MissionApplication/MissionApplication';
import MissionCandidateBox from '../MissionCandidateBox/MissionCandidateBox';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';

import PageSection from '../../elements/PageSection/PageSection';
import PageTitle from '../../elements/PageTitle/PageTitle';
import can from '../../utils/can';

const { Text } = Typography;

const { explore, manage } = routes

interface Props extends Mission {}

const WorkspaceMissionDetail = (mission: Props) => {

  const {
    id,
    name,
    // mission_category_id,
    physical,
    description,
    begin_at,
    end_at,
    due_at,
    organization_id,
    workspace_id,
    workspace,
    image,
    visibility,
    mission_skills,
    banner_image,
    modified_at,
    created_at,
    // modified_by,
    slug,
  } = mission

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const application = currentUser && find(currentUser?.mission_users, {mission_id: (slug || id)}) || null
  
  return (
    <div className="WorkspaceMissionDetail">
    
      <PageSection title={t('mission.summary')}>
        <div>{description}</div>
      </PageSection>
      
      <PageSection title={t('mission.required-skills')}>
        <MissionSkillsForUser
          mission_skills={mission_skills.filter(ms => ms.mandatory === true)}
          user_skills={currentUser?.user_skills}
        />
      </PageSection>

      <PageSection title={t('mission.recommended-skills')}>
        <MissionSkillsForUser
          mission_skills={mission_skills.filter(ms => ms.mandatory === false)}
          user_skills={currentUser?.user_skills}
        />
      </PageSection>

      <MissionCandidateBox />

      <PageSection>

      </PageSection>

    </div>
  )

}

export default WorkspaceMissionDetail