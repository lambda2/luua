import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { useRouter } from 'next/router';
import { Button, Modal, Input } from 'antd';
import WorkspaceInvitationForm from '../WorkspaceInvitationForm/WorkspaceInvitationForm';
import { PollOptionUpdateValues } from 'api/poll';

interface Props {
  onSubmit: (poll_option: PollOptionUpdateValues) => void
  onCancel: () => void
  poll_option?: PollOption
  buttonClassName?: string
}

const PollOptionsModal = ({
  onSubmit,
  onCancel,
  buttonClassName,
  poll_option
}: Props) => {

  const { currentUser, check } = useContext(UserContext)
  const { t } = useLocale()
  const { query } = useRouter()
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState<string>(poll_option?.name || '')
  const [description, setDescription] = useState<string>(poll_option?.description || '')

  if (!currentUser) {
    console.warn("Not logged");
    return <></>
  }

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = async (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    await onSubmit({
      name,
      description
    })
    setVisible(false)
  };

  const handleCancel = async (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    await onCancel()
    setVisible(false)
  };

  return (
    <div className="PollOptionsModal">
      <Button type="primary" className={buttonClassName} onClick={showModal}>
        {t('form.poll.options.button') }
      </Button>
      <Modal
        title={t('form.poll.options.title')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input name="poll_option.name"
          value={name}
          placeholder={t('form.poll.options.name.placeholder')}
          onChange={(e) => setName(e.target.value)}
        />

        <Input name="poll_option.description"
          value={description}
          placeholder={t('form.poll.options.description.placeholder')}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default PollOptionsModal