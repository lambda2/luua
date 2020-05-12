import React, { useContext, useState } from 'react'
import { Modal } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';
import getConfig from 'next/config'

const { publicRuntimeConfig: { contact } } = getConfig()

const WelcomeModal = () => {

  const { t, language } = useLocale()
  const { currentUser } = useContext(UserContext)
  const [visible, setVisible] = useState(true)

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = (e: any)=> {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = (e: any)=> {
    console.log(e);
    setVisible(false)
  };

  return (<div>
    <Modal
      title={t('popups.welcome.title', { first_name: currentUser?.first_name || currentUser?.username })}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{t('popups.welcome.description')}</p>
      <p>{t('popups.welcome.few-notes')}</p>
      <ol>
        <li>
          {t('popups.welcome.steps.feedbacks.pre')}
          {' '}
          <a rel="noopener" target="_blank" href={`mailto:${contact.email}`}>{t('popups.welcome.steps.feedbacks.write-us')}</a>
          {', '}
          <a rel="noopener" target="_blank" href={`https://twitter.com/${contact.twitter}`}>{t('popups.welcome.steps.feedbacks.tweet-us')}</a>
          {' '}{t('generics.or')}{' '}
          <a rel="noopener" target="_blank" href={contact.luua}>{t('popups.welcome.steps.feedbacks.post-a-message')}</a>.
        </li>
        <li>{t('popups.welcome.steps.confirmation_email', {email: currentUser?.email})}</li>
      </ol>
    </Modal>
  </div>
)
};

WelcomeModal.displayName = 'WelcomeModal'

export default WelcomeModal