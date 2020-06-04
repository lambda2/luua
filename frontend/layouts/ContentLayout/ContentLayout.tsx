import classNames from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  sideMenu?: React.ReactNode
  topMenu?: React.ReactNode
  className?: string
  style?: CSSProperties
  format?: 'box' | 'wide' | 'normal'
}

/**
 * The main layout of our app
 */
const ContentLayout: React.FC<Props> = ({
  sideMenu,
  topMenu,
  children,
  style = {},
  format = 'normal',
  className
}) => {

  const overrides = {
    'box-content': (format === 'box'),
    'wide-content': (format === 'wide'),
    'normal-content': (format === 'normal')
  }
  return (<>
    {topMenu || ''}
    <div className={classNames("wrapper-content", className, overrides)}>
      {sideMenu || ''}
      <div className="main-content" style={{ minHeight: 280, width: 760, ...style }}>
        { children }
      </div>
    </div>
  </>)
}

export default ContentLayout
