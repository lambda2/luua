import * as React from 'react';


import MarkdownView from 'react-showdown';
import redraft from 'redraft';
import UserAvatarTooltip from 'elements/UserAvatarTooltip/UserAvatarTooltip';
import { isServer } from 'utils/http';
import Link from 'next/link';
import { formatUrl } from 'utils/link';

interface Props {
  content: string | null,
  serialized_content: string | null
}

// just a helper to add a <br /> after a block
const addBreaklines = (children: any[]) => children.map((child: any) => [child, <br />]);


const renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children: React.ReactNode, { key }: any) => <strong key={key}>{children}</strong>,
    ITALIC: (children: React.ReactNode, { key }: any) => <em key={key}>{children}</em>,
    UNDERLINE: (children: React.ReactNode, { key }: any) => <u key={key}>{children}</u>,
    CODE: (children: React.ReactNode, { key }: any) => <span key={key}>{children}</span>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    unstyled: (children: any[]) => children.map((child: React.ReactNode) => <p>{child}</p>),
    blockquote: (children: any) => <blockquote >{addBreaklines(children)}</blockquote>,
    'header-one': (children: any[]) => children.map((child: React.ReactNode) => <h1>{child}</h1>),
    'header-two': (children: any[]) => children.map((child: React.ReactNode) => <h2>{child}</h2>),
    // You can also access the original keys of the blocks
    'code-block': (children: any, { keys }: any) => <pre key={keys[0]}>{addBreaklines(children)}</pre>,
    // or depth for nested lists
    'unordered-list-item': (children: any[], { depth, keys }: any) => <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>{children.map((child: React.ReactNode) => <li>{child}</li>)}</ul>,
    'ordered-list-item': (children: any[], { depth, keys }: any) => <ol key={keys.join('|')} className={`ol-level-${depth}`}>{children.map((child: React.ReactNode, index: React.Key) => <li key={keys[index]}>{child}</li>)}</ol>,
    // If your blocks use meta data it can also be accessed like keys
    // atomic: (children: any[], { keys, data }: any) => children.map((child: any, i: React.Key) => <Atomic key={keys[i]} {...data[i]} />),
  },
  /**
   * Entities receive children and the entity data
   */
  entities: {
    // key is the entity key value from raw
    LINK: (children: any, data: { url: any; }, { key }: any) => {
      return [...children].map(e => <a key={key} target="_blank" rel="noopener" href={formatUrl(data.url)}>{e}</a>)
    },
    IMAGE: (children: any, data: { src: any; }, { key }: any) => {      
      return <img key={key} src={data.src} />
    },
    mention: (children: any, data: { mention: { name: string, username: string, avatar: string; } }, { key }: any) => 
      <UserAvatarTooltip key={key} text first_name={data.mention.name} thumb_url={data.mention.avatar} withUsername={false} username={data.mention.username}>{children}</UserAvatarTooltip>,
  },
  /**
   * Array of decorators,
   * Entities receive children and the entity data,
   * inspired by https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html
   * it's also possible to pass a custom Decorator class that matches the [DraftDecoratorType](https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js)
   */
  // decorators: [
  //   {
  //     // by default linkStrategy receives a ContentBlock stub (more info under Creating the ContentBlock)
  //     // strategy only receives first two arguments, contentState is yet not provided
  //     strategy: linkStrategy,
  //     // component - a callback as with other renderers
  //     // decoratedText a plain string matched by the strategy
  //     // if your decorator depends on draft-js contentState you need to provide convertFromRaw in redraft options
  //     // component: ({ children: any, decoratedText: any }) => {
  //     //   return <a href={decoratedText}>{children}</a>;
  //     // },
  //   }
  // ],
}


const MessageContent = ({
  content,
  serialized_content
}: Props) => {

  if (serialized_content && !isServer()) {    
    const rendered = redraft(JSON.parse(serialized_content), renderers);
    return <>{rendered}</>
  }

  return (
    <div className="MessageContent">
      <div className="container">
        {content && <MarkdownView
          markdown={content}
        />}
      </div>
    </div>
  );
}

export default MessageContent