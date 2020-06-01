import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';

import { useLocale } from 'hooks/useLocale';
import { apply } from 'api/mission';
import { complete } from 'api/mission_user';
import { Button } from 'antd';
import ErrorBox from 'elements/ErrorBox/ErrorBox';
import checkCustomRoutes from 'next/dist/lib/check-custom-routes';
import MissionApplyBox from '../MissionApplyBox/MissionApplyBox';
import MissionPerformBox from '../MissionPerformBox/MissionPerformBox';

interface Props {
  mission: Mission
  application: LightMissionUser | null
}


const MissionApplication = ({
  mission,
  application,
}: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const [app, setApp] = useState<LightMissionUser | null>(application)
  const [errors, setErrors] = useState<any>(null)
  const { t } = useLocale()

  const applyForMission = async () => {
    try {
      const response = await apply(mission.id, currentUser?.jwt || '')
      console.log({ response })
      setApp(response.data)
      // @TODO update the user context state here instead of triggering an hard refresh
      check()
      setErrors(null)
    } catch (error) {
      setErrors(error)
    }
  }

  const completeMission = async () => {
    
    // This should never happen, but still... 
    if (!application) {
      console.warn("The application is null:", application);
      return
    }

    try {
      const response = await complete(application.id, currentUser?.jwt || '')
      console.log({ response })
      setApp(response.data)
      // @TODO update the user context state here instead of triggering an hard refresh
      check()
      setErrors(null)
    } catch (error) {
      setErrors(error)
    }
  }

  const getProperBoxForStatus = (status?: MissionUserStatus) => {
    switch (status) {
      case 'applied':
        return <MissionApplyBox onApply={applyForMission} application={application} mission={mission} />
      case 'accepted':
        return application && <MissionPerformBox onComplete={completeMission} application={application} mission={mission} />
      default:
        return <MissionApplyBox onApply={applyForMission} application={application} mission={mission} />
    }
  }

  if (!currentUser) {
    return <></>
  }

  return (<>
    {getProperBoxForStatus(application?.status)}
    {errors && <ErrorBox errors={errors} />}
  </>)

}

export default MissionApplication