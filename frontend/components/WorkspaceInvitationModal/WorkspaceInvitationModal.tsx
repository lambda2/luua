import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { useRouter } from 'next/router';
import { Button, Modal } from 'antd';
import WorkspaceInvitationForm from '../WorkspaceInvitationForm/WorkspaceInvitationForm';

interface Props {
  onInvite: () => void
}

const WorkspaceInvitationModal = ({ onInvite }: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const { query } = useRouter()
  const [visible, setVisible] = useState(false)

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = async (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    await onInvite()
    setVisible(false)
  };

  const handleCancel = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    setVisible(false)
  };

  return (
    <div className="WorkspaceInvitationModal">
      <Button type="primary" onClick={showModal}>
        {t('workspace_invitation.invite.button') }
      </Button>
      <Modal
        title={t('workspace_invitation.invite.title')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <WorkspaceInvitationForm onSave={handleOk}/>
      </Modal>
    </div>
  )
}

export default WorkspaceInvitationModal