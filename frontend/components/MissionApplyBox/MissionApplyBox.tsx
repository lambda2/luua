import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { apply } from 'api/mission';
import { Button } from 'antd';
import ErrorBox from 'elements/ErrorBox/ErrorBox';
import checkCustomRoutes from 'next/dist/lib/check-custom-routes';
import MessageBox from 'elements/MessageBox/MessageBox';

interface Props {
  onApply: () => Promise<void>
  mission: Mission
  application: LightMissionUser | null
}

const MissionApplyBox = ({
  onApply,
  mission,
  application,
}: Props) => {

  const { t } = useLocale()

  return (
    <>
      {!application && <MessageBox title={t('mission.candidate.apply.title')}>
        <div>
          <Button onClick={onApply}>{t(`mission.candidate.apply.hiring_validation.${mission.hiring_validation}`)}</Button>
        </div>
      </MessageBox>}
      {application && <MessageBox title={t(`mission.candidate.${application.status}.title`)}>
        <div>
          {application.status !== 'reviewed' && <Button disabled>{t(`mission.candidate.${application.status}.description`)}</Button>}
        </div>
      </MessageBox>}
    </> || <></>
  )
}

export default MissionApplyBox