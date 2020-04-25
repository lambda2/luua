import React from 'react'
import { useLocale } from '../../hooks/useLocale';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

interface Props {
}

const Footer: React.FC<Props> = () => {

  const { t } = useLocale()

  return (<footer className="Footer">
    <ul>
      <li>{t('meta.release')} {publicRuntimeConfig.releaseTag || '-'} ({publicRuntimeConfig.sentryRelease || '-'})</li>
      <li className="pushed"></li>
      <li><a rel="noopener" target="_blank" href="https://github.com/lambda2/luua">{t('meta.source')}</a></li>
      <li><a rel="noopener" target="_blank" href="https://github.com/lambda2/luua/issues/new">{t('meta.report-bug')}</a></li>
      <li><a rel="noopener" target="_blank" href="https://twitter.com/lambda_2">{t('meta.twitter')}</a></li>
    </ul>
  </footer>)


}
export default Footer
