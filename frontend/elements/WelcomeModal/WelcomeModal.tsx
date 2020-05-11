import React, { useContext, useState } from 'react'
import { cdnUrl } from '../../utils/http';
import { Tag, Modal } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import momentWithLocale from '../../i18n/moment';
import UserContext from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar/UserAvatar';
import StatusTag from '../StatusTag/StatusTag';

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
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
)
};

WelcomeModal.displayName = 'WelcomeModal'

export default WelcomeModal