import { useStore } from 'store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from 'config';
import { AppDispatch, AppState } from '..';
import { toggleTheme } from './actions';

export const useThemeManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const setting = useStore(p => p.appReducer.isDark);
  const isDark = useSelector<AppState, AppState['appReducer']['isDark']>(state => state.appReducer.isDark);

  const toggleThemeHandle = useCallback(() => {
    dispatch(toggleTheme());
    window.localStorage.setItem(storage.isDark, JSON.stringify(!setting));
  }, [dispatch, setting]);

  return [isDark, toggleThemeHandle];
};

export const useHackEslint = () => {};
