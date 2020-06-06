import React, { useContext, useState, ReactElement } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import LightPollForm from 'components/PollForm/LightPollForm';

interface Props {
  discussion: LightDiscussion
  buttonElt: (onClick: () => void) => ReactElement
}

const PollFormDiscussionModal = ({
  discussion,
  buttonElt
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()
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
    setVisible(false)
  };

  const handleCancel = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    setVisible(false)
  };

  return (
    <span className="PollFormDiscussionModal">
      {buttonElt(() => showModal()) }
      <Modal
        title={t('form.poll.from-discussion')}
        visible={visible}
        onOk={handleOk}
        style={{maxWidth: "600px"}}
        footer={null}
        onCancel={handleCancel}
      >
        <LightPollForm onSave={handleOk} workspace_id={discussion.workspace_id} discussion={discussion}/>
      </Modal>
    </span>
  )
}

export default PollFormDiscussionModal