import React, { ReactNode } from 'react'
import { Typography } from 'antd';
import { useLocale } from 'hooks/useLocale';

const { Text } = Typography;

interface Props {
  errors?: {message: string}
}

/**
 * Display an error properly
 */
const ErrorBox = ({
  errors
}: Props) => {
  const { t } = useLocale()

  return (
    errors && <Text type="danger">{t('error.title')}: {errors.message}</Text> || <></>
  )
};

ErrorBox.displayName = 'ErrorBox'

export default ErrorBox