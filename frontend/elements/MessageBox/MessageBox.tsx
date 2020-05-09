import React from 'react'
import classNames from 'classnames';


interface Props {
  color?: 'default' | 'success' | 'danger'
  title?: string
}

/**
 * A simple box
 */
const MessageBox: React.FC<Props> = ({
  title,
  children,
  color = 'default'
}) => {
  return <div className={classNames("MessageBox", color)}>
    {title && <h5>{title}</h5>}
    {children}
  </div>
}

MessageBox.displayName = 'MessageBox'

export default MessageBox