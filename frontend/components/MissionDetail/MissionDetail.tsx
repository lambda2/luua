import React, { useContext } from 'react';
import { Avatar } from 'antd';
import Link from 'next/link';
import { find } from 'lodash';
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

// import './MissionDetail.module.less'

const { Text } = Typography;

const { explore } = routes

interface Props extends Mission {}

const MissionDetail = (mission: Props) => {

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

  const application = currentUser && find(currentUser?.mission_users, {mission_id: id}) || null
  
  return (
    <div className="MissionDetail">

      <PageTitle
        title={name}
      >
        <aside>
          <div>
            <Avatar size="large" src={cdnUrl(workspace?.thumb_url || '')} />
          </div>
          <div className="org-title">
            <span>
              {t('mission.created-by')}{' '}
              <Link {...explore.workspace.show(workspace?.slug || workspace_id)}><a>{workspace?.name}</a></Link>
            </span>
            <Text type="secondary">{moment(created_at).calendar()}</Text>
          </div>
        </aside>

      </PageTitle>

      <MissionCandidateBox />

      <PageSection title={t('mission.required-skills')}>
        <MissionSkillsForUser
          mission_skills={mission_skills}
          user_skills={currentUser?.user_skills}
        />
      </PageSection>

      <PageSection title={t('mission.summary')}>
        <div>{description}</div>
      </PageSection>

      <PageSection>
        <MissionApplication application={application} mission={mission} />
      </PageSection>

    </div>
  )

}

export default MissionDetail