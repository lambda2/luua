import React, { useState } from 'react'
import { useLocale } from '../../hooks/useLocale';
import { Button } from 'antd';
import MarkdownContent from "../../elements/MarkdownContent/MarkdownContent";
// import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import ReactMde from "react-mde";


interface Props {
  onSubmit: (message: string) => {}
  isSubmitting?: boolean
}

/**
 * Our own submit button
 */
const DiscussionForm: React.FC<Props> = ({
  isSubmitting = false,
  onSubmit
}) => {

  const { t } = useLocale()
  const [message, setMessage] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <div className="DiscussionForm">

      <div className="container">
        <ReactMde
          value={message}
          onChange={setMessage}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<MarkdownContent content={markdown} />)
          }
        />
      </div>
      <Button loading={isSubmitting} onClick={() => onSubmit(message)}>Send</Button>
    </div>
  );
};

DiscussionForm.displayName = 'DiscussionForm'

export default DiscussionForm