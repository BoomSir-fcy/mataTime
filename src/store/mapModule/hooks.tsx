import { FetchStatus } from 'config/types';
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

export const usePostDetailById = id => {
  const { postMap } = useMapModule();

  return useMemo(() => {
    return postMap[id];
  }, [postMap, id]);
};

export const usePostTranslateMap = (translate, id) => {
  const { postTranslateMap } = useMapModule();

  return useMemo(() => {
    return (
      postTranslateMap[id] || {
        status: FetchStatus.NOT_FETCHED,
        content: '',
      }
    );
  }, [postTranslateMap, id]);
};
