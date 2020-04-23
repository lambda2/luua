import { Layout } from 'antd';

import classNames from 'classnames';

import './ContentLayout.module.less';

const { Content } = Layout;


interface Props {
  sideMenu?: React.ReactNode
  className?: string
  format?: 'box' | 'wide' | 'normal'
}


/**
 * The main layout of our app
 */
const ContentLayout: React.FC<Props> = ({
  sideMenu,
  children,
  format = 'normal',
  className
}) => {

  const overrides = {
    'box-content': (format === 'box'),
    'wide-content': (format === 'wide'),
    'normal-content': (format === 'normal')
  }
  return (<Layout className={classNames("main-content", className, overrides)}>
    {sideMenu || ''}
    <Content className="main-content" style={{ padding: '0 24px', minHeight: 280 }}>
      { children }
    </Content>
  </Layout>)


}

export default ContentLayout
