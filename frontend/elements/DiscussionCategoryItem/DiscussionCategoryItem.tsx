import React, { useContext } from 'react'
import { cdnUrl } from '../../utils/http';
import { Tag, Button } from 'antd';
import { useLocale } from '../../hooks/useLocale';
import momentWithLocale from '../../i18n/moment';
import UserContext from '../../contexts/UserContext';
import UserAvatar from '../UserAvatar/UserAvatar';
import StatusTag from '../StatusTag/StatusTag';
import DiscussionCategoryBadge from '../DiscussionCategoryBadge/DiscussionCategoryBadge';
import DiscussionCategoryModal from '../../components/DiscussionCategoryModal/DiscussionCategoryModal';
import icons from '../../dictionaries/icons';

interface Props {
  discussion_category: DiscussionCategory,
  onUpdate: () => void
  onDelete: (id: number) => void
}

const DiscussionCategoryItem = ({ discussion_category, onUpdate, onDelete }: Props) => {

  const { t, language } = useLocale()

  return (
    <div className="DiscussionCategoryItem">
      <DiscussionCategoryBadge text size='small' category={discussion_category} />
      <DiscussionCategoryModal label={t('discussion_category.edit')} onUpdate={onUpdate} category={discussion_category} />
      <Button onClick={() => onDelete(discussion_category.id)}>{icons.delete}</Button>
    </div>
  );
};

DiscussionCategoryItem.displayName = 'DiscussionCategoryItem'

export default DiscussionCategoryItem