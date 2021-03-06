import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MarkdownView from 'react-showdown';


interface Props {
  content: string,
}

const MarkdownExcerpt = ({
  content
}: Props) => {

  const splitted = content.split("\n")
  const excerpt = splitted && splitted[0]
  // const hasMore = splitted && splitted.length > 1
  
  return (
    <div className="MarkdownContent">
      <div className="container text-light">
        <MarkdownView
          markdown={excerpt}
        />
        {/* {hasMore && <span className="hasMore">...</span>} */}
      </div>
    </div>
  );
}

export default MarkdownExcerpt