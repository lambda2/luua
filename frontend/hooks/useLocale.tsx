import { useState, useEffect, useContext } from 'react';
import LocaleContext from 'contexts/LocaleContext';

export const useLocale = () => {
  const { t, language } = useContext(LocaleContext)

  return {
    t,
    language
  }
}
