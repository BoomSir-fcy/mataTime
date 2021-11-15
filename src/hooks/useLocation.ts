import { useDispatch } from 'react-redux';
import React from 'react';
import { useStore, storeAction } from 'store';
import { Api } from 'apis';

export function useLocation() {
  const dispatch = useDispatch();
  const setting = useStore(p => p.appReducer.systemCustom);
  const { languange } = setting;

  const request = async () => {
    const systemLang = languange?.value?.code;
    try {
      const res = await Api.UserApi.getLocation();
      if (Api.isSuccess(res)) {
        const location: [] = res.data.reduce((prve, current) => {
          const country = systemLang === 'CN' ? current.LocaltionZh : current.LocationEn;
          prve.push({
            ...current,
            id: current.ID,
            label: country,
            value: country
          });
          return prve;
        }, []);
        dispatch(storeAction.setLocation(location));
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    request();
  }, []);
}
