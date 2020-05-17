import React from 'react'
import icons, { isEmoji } from 'dictionaries/icons';
import classNames from 'classnames';


interface Props {
  category: DiscussionCategory
  text?: boolean
  size?: 'small' | 'default' | 'large'
}

/**
 * Our own submit button
 */
const DiscussionCategoryBadge = ({
  text = false,
  size = 'default',
  category
}: Props) => {

  const icon = category.icon && (
    isEmoji(category.icon) && category.icon
  ) || (icons as any)[(category.icon as any)]

  const style = {
    color: category.color
  }

  return (
    <span style={style} className={classNames('DiscussionCategoryBadge', size, { "has-text": text})}>
      {icon}
      {text && <span>{category.name}</span>}
    </span>
  );
};

DiscussionCategoryBadge.displayName = 'DiscussionCategoryBadge'

export default DiscussionCategoryBadge