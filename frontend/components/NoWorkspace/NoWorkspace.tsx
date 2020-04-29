import React from 'react';
import { useLocale } from '../../hooks/useLocale';
import MessageBox from '../../elements/MessageBox/MessageBox';
import ROUTES from '../../routes/manage';
import Link from 'next/link';


/**
 * A box we will display when the user don't have a workspace yet...
 * 
 * @TODO Centering with Row/Col is ugly !
 * Maybe do a component for centered-like messages.
 */
const NoWorkspace = () => {

  const { t } = useLocale()

  return (
    <>
      <MessageBox>
        <p><b>{t('workspace.no-workspace-yet.title')}</b></p>
        <p>{t('help.workspace.what')}</p>
        <br/>
        <Link {...ROUTES.manage.workspace.new()}>
          {t('workspace.no-workspace-yet.create-now')}
        </Link>

      </MessageBox>
        {/* <Paragraph strong>{t('workspace.no-workspace-yet.title')}</Paragraph> */}
  </>)
}

export default NoWorkspace