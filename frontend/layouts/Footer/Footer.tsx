import React from 'react'
import { useLocale } from 'hooks/useLocale';
import getConfig from 'next/config';
import icons from 'dictionaries/icons';
const { publicRuntimeConfig } = getConfig();

interface Props {
}

const Footer: React.FC<Props> = () => {

  const { t } = useLocale()

  return (<footer className="Footer">
    <ul>
      <li>{t('meta.release')} {publicRuntimeConfig.releaseTag || publicRuntimeConfig.sentryRelease || '🏡 '}</li>
      <li className="pushed"></li>
      <li>
        <a rel="noopener" target="_blank" href="https://github.com/lambda2/luua/issues/new/choose">{t('meta.report-bug')}</a>
      </li>
      <li>
        <a rel="noopener" target="_blank" href="https://github.com/lambda2/luua">{icons.brands.github}{' '}{t('meta.source')}</a>
      </li>
      <li>
        <a rel="noopener" target="_blank" href="https://twitter.com/lambda_2">{icons.brands.twitter }{' '}{t('meta.twitter')}</a>
      </li>
      <li>
        <a rel="noopener" target="_blank" href="https://discord.gg/zZQtYzp">{ icons.brands.discord }{' '}{t('meta.discord')}</a>
      </li>
    </ul>
  </footer>)

}
export default Footer
