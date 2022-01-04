import React from 'react';
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';
import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';

export function useLocation() {
  const dispatch = useDispatch();
  const { currentLanguage } = useTranslation();

  const request = async () => {
    try {
      const res = await Api.UserApi.getLocation();
      if (Api.isSuccess(res)) {
        const location: [] = res.data.reduce((prve, current) => {
          const country =
            currentLanguage?.locale === 'zh-TW'
              ? current.LocaltionZh
              : current.LocationEn;
          prve.push({
            ...current,
            id: current.ID,
            label: country,
            value: country,
          });
          return prve;
        }, []);
        dispatch(storeAction.setLocation(location));
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    request();
  }, []);
}
