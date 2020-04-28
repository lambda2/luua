import React from 'react'

import classNames from 'classnames';
// import './StatusTag.module.less'
import { Tag, Popover } from 'antd';
import { useLocale } from "../../hooks/useLocale";


interface Props {
  status: string
}

/**
 * A tag for a skill
 */
 const StatusTag: React.FC<Props> = ({
  status
}) => {

  const { t } = useLocale()

  const colors: any = {
    'pending': 'grey',
    'accepted': 'green',
    'rejected': 'red',
  }

  return (
      <Tag color={colors[`${status}`]}>{t(`status.${status}`)}</Tag>
  );
};

StatusTag.displayName = 'StatusTag'

export default StatusTag