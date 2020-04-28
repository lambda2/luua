// import { Layout } from 'antd';

import classNames from 'classnames';

// import './ContentLayout.module.less';

// const { Content } = Layout;


interface Props {
  sideMenu?: React.ReactNode
  topMenu?: React.ReactNode
  className?: string
  format?: 'box' | 'wide' | 'normal'
}


/**
 * The main layout of our app
 */
const ContentLayout: React.FC<Props> = ({
  sideMenu,
  topMenu,
  children,
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
      <div className="main-content" style={{ minHeight: 280 }}>
        { children }
      </div>
    </div>
  </>)


}

export default ContentLayout
