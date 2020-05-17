import React, { useContext, useState } from 'react';
import UserContext from 'contexts/UserContext';
import { useLocale } from 'hooks/useLocale';
import { useRouter } from 'next/router';
import { Button, Modal } from 'antd';
import DiscussionCategoryForm from '../DiscussionCategoryForm/DiscussionCategoryForm';

interface Props {
  onUpdate: () => void
  label?: string
  category?: DiscussionCategory
}

const DiscussionCategoryModal = ({ onUpdate, category, label }: Props) => {

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
    await onUpdate()
    setVisible(false)
  };

  const handleCancel = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    setVisible(false)
  };

  return (
    <div className="DiscussionCategoryModal">
      <Button type="primary" onClick={showModal}>
        {label}
      </Button>
      <Modal
        title={category?.id ? t('discussion_category.edit') : t('discussion_category.create.title')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DiscussionCategoryForm discussion_category={category} onSave={handleOk}/>
      </Modal>
    </div>
  )
}

export default DiscussionCategoryModal