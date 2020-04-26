import React from 'react'
// import { i18n } from '../../i18n/i18n'
import { Button } from 'antd'

const LangSelect = ({ currentLanguage }: { currentLanguage: string }) => {
  // const lang = currentLanguage || i18n.language
  return (
    <div className="language-select">
      {/* <Button
        type='link'
        onClick={() => i18n.changeLanguage(lang === 'en' ? 'fr' : 'en')}
      >
        {lang === 'en' ? '🇫🇷 Francais' : '🇬🇧 English'}
      </Button> */}
    </div>
  )
}

// LangSelect.getInitialProps = async ({ req }: any) => {
//   const currentLanguage = req ? req.language : i18n.language
//   return { currentLanguage }
// }

export default LangSelect
