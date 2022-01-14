import React from 'react'
import { PancakeTheme } from 'pancake-uikit'
import { DeepPartial } from 'redux'

export type Theme = DeepPartial<PancakeTheme>

interface ThemeProps {
  dark: Theme
  light: Theme
}

const ThemesValue = React.createContext<ThemeProps>({ dark: null, light: null })

const ThemesValueProvider = ({ children, light, dark }) => {

  return <ThemesValue.Provider value={{ dark, light }}>{children}</ThemesValue.Provider>
}

export { ThemesValue, ThemesValueProvider }
