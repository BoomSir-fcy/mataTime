import { useContext } from 'react'
import { ThemesValue } from 'contexts/ThemesValueContext'

const useThemesValue = () => {
  const { dark, light } = useContext(ThemesValue)
  return { dark, light }
}

export default useThemesValue
