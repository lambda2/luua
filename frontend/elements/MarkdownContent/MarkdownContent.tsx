import * as React from 'react';
import * as ReactDOM from 'react-dom';

import "react-mde/lib/styles/css/react-mde-all.css";

import MarkdownView from 'react-showdown';


interface Props {
  content: string,
}

const MarkdownContent = ({
  content
}: Props) => {


  return (
    <div className="MarkdownContent">
      <div className="container">
        <MarkdownView
          markdown={content}
        />
      </div>
    </div>
  );
}

export default MarkdownContent