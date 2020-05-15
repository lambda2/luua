import React from 'react'
import icons from '../../dictionaries/icons';


interface Props {
  category: DiscussionCategory
  text?: boolean
  size?: 'small' | 'default' | 'large'
}

/**
 * Our own submit button
 */
const DiscussionCategoryBadge: React.FC<Props> = ({
  children,
  text = false,
  size = 'default',
  category
}) => {

  const icon = category.icon && (icons as any)[(category.icon as any)]

  const style = {
    color: category.color
  }

  return (
    <span style={style} className={`DiscussionCategoryBadge ${size}`}>
      {icon}
      {text && <span>{category.name}</span>}
      {children}
    </span>
  );
};

DiscussionCategoryBadge.displayName = 'DiscussionCategoryBadge'

export default DiscussionCategoryBadge