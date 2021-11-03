import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { toggleTheme } from './actions'

export const useThemeManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>()
  const isDark = useSelector<AppState, AppState['appReducer']['isDark']>((state) => state.appReducer.isDark)

  const toggleThemeHandle = useCallback(() => {
    dispatch(toggleTheme())
  }, [dispatch])

  return [isDark, toggleThemeHandle]
}

export const useHackEslint = () => { }
