import React from 'react'

import MainMenu from '../MainMenu/MainMenu'

import { UserProvider } from '../../contexts/UserContext'

import { Layout, ConfigProvider } from 'antd';

import { WorkspaceProvider } from '../../contexts/WorkspaceContext'

import fr from 'antd/lib/locale/fr_FR';
import en from 'antd/lib/locale/en_US';
import { LocaleProvider } from '../../contexts/LocaleContext'
import Footer from '../Footer/Footer';

const locales = { fr, en }

const { Content } = Layout;


interface Props {
    children: React.ReactNode
    className?: string
    token?: string
    locale?: AvailableLocale
}

/**
 * Our main container
 * @param className The class to add
 */
const LuuaLayout = ({ token, locale, children, className }: Props) => {    
  return (
    <LocaleProvider language={locale || 'en'}>
      <UserProvider token={token}>
        <WorkspaceProvider>
          <ConfigProvider locale={locales[(locale || 'en') as AvailableLocale]}>
            <Layout className="main-layout">
              <MainMenu />
              <Content style={{ padding: '0 50px' }}>
                {children}
              </Content>
              <Footer />
            </Layout>
          </ConfigProvider>
        </WorkspaceProvider>
      </UserProvider>
    </LocaleProvider>
  )
}

LuuaLayout.displayName = 'LuuaLayout'

export default LuuaLayout
