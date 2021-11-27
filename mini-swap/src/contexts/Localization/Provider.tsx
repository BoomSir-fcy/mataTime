import React, { createContext, useCallback, useEffect, useState } from 'react'
import { EN, languages, Language } from 'config/localization/languages'
import translations from 'config/localization/translations.json'
import { ContextApi, ContextData, ProviderState } from './types'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from './helpers'

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
}

const saveLang = {}

// Export the translations directly
export const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, translations)

export const LanguageContext = createContext<ContextApi>(undefined)

export const LanguageProvider: React.FC<{ lang?: string }> = ({ lang, children }) => {
  const [state, setState] = useState<ProviderState>(() => {
    const codeFromStorage = getLanguageCodeFromLS()

    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage],
    }
  })
  const { currentLanguage } = state

  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = getLanguageCodeFromLS()

      if (codeFromStorage !== EN.locale) {
        const enLocale = languageMap.get(EN.locale)
        const currentLocale = await fetchLocale(codeFromStorage)
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale })
      }

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }))
    }

    fetchInitialLocales()
  }, [setState])

  const setLanguage = async (language: Language) => {
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))

      const locale = await fetchLocale(language.locale)
      const enLocale = languageMap.get(EN.locale)

      // Merge the EN locale to ensure that any locale fetched has all the keys
      languageMap.set(language.locale, { ...enLocale, ...locale })
      localStorage.setItem(LS_KEY, language.locale)

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))
    } else {
      localStorage.setItem(LS_KEY, language.locale)
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))
    }
  }
  const setLanguageOfLocale = async (localeKeys: string) => {
    if (!languages[localeKeys]) return
    if (!languageMap.has(localeKeys)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))

      const locale = await fetchLocale(localeKeys)
      const enLocale = languageMap.get(EN.locale)

      // Merge the EN locale to ensure that any locale fetched has all the keys
      languageMap.set(localeKeys, { ...enLocale, ...locale })
      localStorage.setItem(LS_KEY, localeKeys)

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: languages[localeKeys],
      }))
    } else {
      localStorage.setItem(LS_KEY, localeKeys)
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: languages[localeKeys],
      }))
    }
  }

  const translate = useCallback(
    (key: string, data?: ContextData) => {
      saveLang[key] = key
      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(EN.locale)
      const translatedText = translationSet[key] || key || ''

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedText.match(/%\S+?%/gm)

      if (includesVariable && data) {
        let interpolatedText = translatedText
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, 'g')
          interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString())
        })

        return interpolatedText
      }

      return translatedText
    },
    [currentLanguage],
  )

  const getHTML = useCallback(
    (key: string, data?: ContextData) => {
      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(EN.locale)
      const translatedText = translationSet[key] || key

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedText.match(/%\S+?%/gm)

      if (includesVariable && data) {
        let interpolatedText = translatedText
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, 'g')
          interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString())
        })

        const el = React.createElement('span', {
          dangerouslySetInnerHTML: {
            __html: interpolatedText,
          },
        })
        // when key exists, it should still return element if there's defaultMessage() after getHTML()
        return el
      }

      return translatedText
    },
    [currentLanguage],
  )

  useEffect(() => {
    if (lang) {
      setLanguageOfLocale(lang)
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage, getHTML, t: translate }}>
      {children}
    </LanguageContext.Provider>
  )
}
