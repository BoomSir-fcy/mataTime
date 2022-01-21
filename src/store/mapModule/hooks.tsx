import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MapModuleState } from '../types';

export const useMapModule = () => {
  const mapModule = useSelector(
    (state: { mapModule: MapModuleState }) => state.mapModule,
  );
  return mapModule;
};

export const useUserInfoById = id => {
  const { userMap } = useMapModule();

  return useMemo(() => {
    return userMap[id];
  }, [userMap, id]);
};
