import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
// import './MissionApplyBox.module.less'
import { useLocale } from '../../hooks/useLocale';
import { apply } from '../../api/mission';
import { Button } from 'antd';
import ErrorBox from '../../elements/ErrorBox/ErrorBox';
import checkCustomRoutes from 'next/dist/lib/check-custom-routes';
import MessageBox from '../../elements/MessageBox/MessageBox';

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
    <div className="MissionApplyBox">
      {!application && <MessageBox title={t('mission.candidate.apply.title')}>
        <div>
          <Button onClick={onApply}>{t('mission.candidate.apply.apply')}</Button>
        </div>
      </MessageBox>}
      {application && <MessageBox title={t(`mission.candidate.${application.status}.title`)}>
        <div>
          <Button disabled>{t(`mission.candidate.${application.status}.description`)}</Button>
        </div>
      </MessageBox>}
    </div> || <></>
  )
}

export default MissionApplyBox