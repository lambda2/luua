
import * as Yup from 'yup';
import fr from './locales/fr'
import { useLocale } from '../../hooks/useLocale';


// @TODO Awful, we're loading all the locales here.
// Maybe check if we can dynamically load them with next/dynamic
const locales: any = {
  fr,
  en: {}
}

const YupWithLocale = () => {
  const { language } = useLocale()
  const lang = language || 'fr'
  Yup.setLocale(locales[lang])

  return Yup
}


export default YupWithLocale