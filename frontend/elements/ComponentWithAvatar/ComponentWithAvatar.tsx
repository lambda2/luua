import React, { ReactElement } from 'react'
import classNames from 'classnames';


interface Props {
  className?: string
  avatar: ReactElement
}

/**
 * Our custom heading
 */
const ComponentWithAvatar: React.FC<Props> = ({
  children,
  avatar,
  className
}) => {

  return (<div className={classNames("ComponentWithAvatar", className)}>
    <aside>{avatar}</aside>
    <main>{children}</main>
  </div>)
};

ComponentWithAvatar.displayName = 'ComponentWithAvatar'

export default ComponentWithAvatar