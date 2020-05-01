import React, { ReactElement } from 'react'
import classNames from 'classnames';
import Title from '../Title/Title';


interface Props {
  level?: '1' | '2' | '3' | '4' | '5' | '6',
  className?: string
  avatar: ReactElement
}

/**
 * Our custom heading
 */
const TitleWithAvatar: React.FC<Props> = ({
  children,
  avatar,
  className,
  level = '1',
}) => {

  return (<div className={classNames("TitleWithAvatar", className)}>
    <Title level={level}>
      <aside>{avatar}</aside>
      <main>{children}</main>
    </Title>
  </div>)
};

TitleWithAvatar.displayName = 'TitleWithAvatar'

export default TitleWithAvatar