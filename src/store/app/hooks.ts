import { useStore } from 'store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { AppDispatch, AppState } from '..';
import { toggleTheme, setSystemCustom } from './actions';
import { languange } from './type';

export const useThemeManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const setting = useStore(p => p.appReducer.systemCustom);
  const isDark = useSelector<
    AppState,
    AppState['appReducer']['systemCustom']['isDark']
  >(state => state.appReducer.systemCustom.isDark);

  const toggleThemeHandle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch, setting]);

  return [isDark, toggleThemeHandle];
};

export const useNotification = (): [boolean, () => void] => {
  const dispatch = useDispatch();
  const setting = useStore(p => p.appReducer.systemCustom);

  const setNotification = useCallback(() => {
    const systemSetting = {
      ...setting,
      notification: !setting.notification
    };
    dispatch(setSystemCustom(systemSetting));
  }, [dispatch, setting]);

  return [setting.notification, setNotification];
};

export const useLanguange = (): [languange, (val: languange) => void] => {
  const dispatch = useDispatch();
  const setting = useStore(p => p.appReducer.systemCustom);
  const { setLanguage } = useTranslation();

  const setUseLanguage = useCallback(
    val => {
      const systemSetting = {
        ...setting,
        languange: val
      };

      // setLanguage(val.value);
      // dispatch(setSystemCustom(systemSetting));
    },
    [dispatch, setting]
  );

  return [setting.languange, setUseLanguage];
};

export const useHackEslint = () => { };
