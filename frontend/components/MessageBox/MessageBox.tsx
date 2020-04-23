import React from 'react';
// import './MessageBox.module.less'

interface Props {
}

const MessageBox: React.FC<Props> = ({ children }) => {


  return (
    <div className="MessageBox">
      { children }  
    </div>
  )
}

export default MessageBox
