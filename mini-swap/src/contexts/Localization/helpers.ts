import { EN, ZHCN } from 'config/localization/languages'
import translations from 'config/localization/translations.json'
import translationsZhCN from 'config/localization/zh-CN.json'

const translation = {
  [EN.locale]: translations,
  [ZHCN.locale]: translationsZhCN,
}
// const publicUrl = process.env.PUBLIC_URL

export const LS_KEY = 'storage_language'

export const fetchLocale = async (locale) => {
  // const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  // const data = await response.json()
  return translation[locale]
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
