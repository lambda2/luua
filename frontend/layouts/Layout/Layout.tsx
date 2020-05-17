import { ConfigProvider, Layout } from 'antd';
import en from 'antd/lib/locale/en_US';
import fr from 'antd/lib/locale/fr_FR';
import { LocaleProvider } from 'contexts/LocaleContext';
import { UserProvider } from 'contexts/UserContext';
import { WorkspaceProvider } from 'contexts/WorkspaceContext';
import React, { useEffect } from 'react';
import ahoy from 'utils/analytics';

import Footer from '../Footer/Footer';
import MainMenu from '../MainMenu/MainMenu';

const locales = { fr, en }

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

  useEffect(() => {
    (ahoy as any)?.trackAll()
  }, [])

  return (
    <LocaleProvider language={locale || 'en'}>
      <UserProvider token={token}>
        <WorkspaceProvider>
          <ConfigProvider locale={locales[(locale || 'en') as AvailableLocale]}>
            <Layout className="main-layout">
              <MainMenu />
              <div className="layout-content">{children}</div>
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
