import React, { useContext, useState, ReactElement } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { Modal } from 'antd';
import PollForm from 'components/PollForm/PollForm';
import MissionForm from 'components/MissionForm/MissionForm';

interface Props {
  discussion: LightDiscussion
  buttonElt: (onClick: () => void) => ReactElement
}

const MissionFromDiscussionModal = ({
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
    <span className="MissionFromDiscussionModal">
      {buttonElt(() => showModal()) }
      <Modal
        title={t('form.mission.from-discussion')}
        visible={visible}
        onOk={handleOk}
        width={"80%"}
        footer={null}
        onCancel={handleCancel}
      >
        <MissionForm workspace_id={discussion.workspace_id} discussion={discussion}/>
      </Modal>
    </span>
  )
}

export default MissionFromDiscussionModal