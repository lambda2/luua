import React, { createContext, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cookie from 'js-cookie'

import fr from '../../i18n/locales/fr/common.json'
import en from '../../i18n/locales/en/common.json'
import { get, templateSettings, template } from 'lodash'

const dicts = {
  fr,
  en
}

const defaultValue = {
  language: 'fr',
  t: (key: string, object?: any) => key
}

interface LocaleProviderProps {
  language: AvailableLocale
  children: React.ReactNode
}

const LocaleContext = createContext(defaultValue)

const LocaleProvider: React.FC<LocaleProviderProps> = ({children, ...props}) => {


  const resources = dicts[props.language]  

  // Our cheap t() function
  const t = (key: string, object?: any): string => {
    const trans = get(resources, key)
    if (trans === undefined) {
      console.warn(`[i18n] Unable to find '${key}'`)
      return key
    }
    if (object) {
      templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = template(trans);
      return compiled(object);
    }
    return trans
  }

  // We set a little cookie to keep track of the picked locale
  useEffect(() => {
    console.log("Setting locale to ", props.language)
    cookie.set('locale', props.language)
  }, [props.language])

  const values = useMemo(() => {
    return ({
      t,
      resources,
      ...props
    })
  }, [`${props.language}`])


  return (<LocaleContext.Provider value={values}>
    {children}
  </LocaleContext.Provider>)
}

LocaleProvider.displayName = 'LocaleProvider'

export { LocaleProvider }
export default LocaleContext
