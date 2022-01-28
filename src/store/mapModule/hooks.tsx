import { HomeApi } from 'apis/Home';
import { FetchStatus } from 'config/types';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapModuleState } from '../types';
import { removeTranslateIds } from './actions';
import { fetchPostTranslateAsync, setPostTranslate } from './reducer';
import { loginReducer, loginAction, Login, fetchUserInfoAsync } from '../login';

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

export const usePostTranslateMap = id => {
  const { postTranslateMap } = useMapModule();

  return useMemo(() => {
    return postTranslateMap[id] || null;
  }, [postTranslateMap, id]);
};

export const useFetchAutoPostTranslate = () => {
  const { postMap, needTranslatePostIds } = useMapModule();
  const userInfo = useSelector(
    (state: { loginReducer: Login }) => state.loginReducer.userInfo,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(needTranslatePostIds, 'needTranslatePostIds');
    if (userInfo.translation === 1 && needTranslatePostIds.length) {
      const fetchIds = [];
      needTranslatePostIds.forEach(id => {
        if (!postMap[id]) {
          fetchIds.push(id);
        }
      });
      dispatch(removeTranslateIds(needTranslatePostIds));
      if (fetchIds.length) {
        dispatch(fetchPostTranslateAsync(fetchIds));
      }
    } else if (needTranslatePostIds.length) {
      dispatch(
        setPostTranslate({
          ids: needTranslatePostIds,
          data: {},
          status: FetchStatus.NOT_FETCHED,
          showTranslate: false,
        }),
      );
    }
  }, [needTranslatePostIds, dispatch, postMap, userInfo.translation]);
};
