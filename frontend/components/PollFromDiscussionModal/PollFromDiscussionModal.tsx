import React, { useContext, useState, ReactElement } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import PollForm from 'components/PollForm/PollForm';

interface Props {
  discussion: LightDiscussion
  buttonElt: (onClick: () => void) => ReactElement
}

const PollFromDiscussionModal = ({
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
    <div className="PollFromDiscussionModal">
      {buttonElt(() => showModal()) }
      <Modal
        title={t('form.poll.from-discussion')}
        visible={visible}
        onOk={handleOk}
        width={"80%"}
        footer={null}
        onCancel={handleCancel}
      >
        <PollForm workspace_id={discussion.workspace_id} discussion={discussion}/>
      </Modal>
    </div>
  )
}

export default PollFromDiscussionModal