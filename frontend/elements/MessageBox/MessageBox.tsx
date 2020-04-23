import React from 'react'
import classNames from 'classnames';
import './MessageBox.module.less'


interface Props {
}

/**
 * A simple box
 */
const MessageBox: React.FC<{ title?: string }> = ({
  title,
  children
}) => {
  return <div className="MessageBox">
    {title && <h3>{title}</h3>}
    {children}
  </div>
}

MessageBox.displayName = 'MessageBox'

export default MessageBox