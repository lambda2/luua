import React from 'react'

import classNames from 'classnames';
// import './CandidateStatusStep.module.less'
import { Tag, Popover, Steps } from 'antd';
import { useLocale } from "../../hooks/useLocale";
import omit from 'lodash/omit';


interface Props {
  mission_user: MissionUser
}

/**
 * Progress of the candidate mission
 */
 const CandidateStatusStep: React.FC<Props> = ({
  mission_user,
}) => {

  const { t } = useLocale()
  const {
    status
  } = mission_user
  const steps = {
    "applied": {
      position: 0,
      title: t('mission_user.applied.name')
    },
    "rejected": {
      position: 1,
      title: t('mission_user.rejected.name')
    },
    "accepted": {
      position: 1,
      title: t('mission_user.accepted.name')
    },
    "completed": {
      position: 2,
      title: t('mission_user.completed.name')
    },
    "reviewed": {
      position: 3,
      title: t('mission_user.reviewed.name')
    }
  }

   const active = steps[status].position
   const toOmit = status === 'rejected' ? 'accepted' : 'rejected'
   const statusColor = status === 'rejected' ? 'error' : (status === 'reviewed' ? 'finish' : 'process')
  
   return (
     <Steps direction="horizontal" current={active} size="small" progressDot status={statusColor}>
       {Object.values(omit(steps, toOmit)).map(st => 
         <Steps.Step title={st.title} />
        ) }
     </Steps>
  );
};

CandidateStatusStep.displayName = 'CandidateStatusStep'

export default CandidateStatusStep