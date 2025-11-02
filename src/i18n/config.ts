import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import am from './locales/am.json'
import ti from './locales/ti.json'
import om from './locales/om.json'
import so from './locales/so.json'
import aa from './locales/aa.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      ti: { translation: ti },
      om: { translation: om },
      so: { translation: so },
      aa: { translation: aa }
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      cookieMinutes: 60 * 24 * 365,
      cookieDomain: window.location.hostname,
      lookupCookie: 'unichoice_lang'
    }
  })

export default i18n

