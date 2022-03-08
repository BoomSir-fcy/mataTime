import { HomeApi } from 'apis/Home';
import { FetchStatus } from 'config/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapModuleState } from '../types';
import { removeCommentTranslateIds, removeTranslateIds } from './actions';
import {
  fetchCommentTranslateAsync,
  fetchPostTranslateAsync,
  fetchTribeInfoAsync,
  setCommentTranslate,
  setPostTranslate,
} from './reducer';
import { loginReducer, loginAction, Login, fetchUserInfoAsync } from '../login';
import useRefresh from 'hooks/useRefresh';

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

export const useTribeInfoById = id => {
  const { tribeInfoMap } = useMapModule();

  return useMemo(() => {
    return tribeInfoMap[id];
  }, [tribeInfoMap, id]);
};

export const useFetchTribeInfoById = id => {
  const dispatch = useDispatch();
  const { fastRefresh } = useRefresh();

  const fetchInfo = useCallback(() => {
    if (id) {
      dispatch(fetchTribeInfoAsync(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    fetchInfo();
  }, [fetchInfo, fastRefresh]);

  return {
    updater: fetchInfo,
  };
};

export const useTribePostDetailById = id => {
  const { tribePostMap } = useMapModule();

  return useMemo(() => {
    return tribePostMap[id];
  }, [tribePostMap, id]);
};

export const usePostTranslateMap = id => {
  const { postTranslateMap } = useMapModule();

  return useMemo(() => {
    return postTranslateMap[id] || null;
  }, [postTranslateMap, id]);
};

export const useCommentTranslateMap = id => {
  const { commentTranslateMap } = useMapModule();

  return useMemo(() => {
    return commentTranslateMap[id] || null;
  }, [commentTranslateMap, id]);
};

export const useFetchAutoPostTranslate = () => {
  const { postTranslateMap, needTranslatePostIds } = useMapModule();
  const userInfo = useSelector(
    (state: { loginReducer: Login }) => state.loginReducer.userInfo,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.translation === 1 && needTranslatePostIds.length) {
      const fetchIds = [];
      needTranslatePostIds.forEach(id => {
        if (!postTranslateMap[id]) {
          fetchIds.push(id);
        }
      });
      dispatch(removeTranslateIds(needTranslatePostIds));
      if (fetchIds.length) {
        dispatch(fetchPostTranslateAsync(fetchIds));
      }
    } else if (needTranslatePostIds.length) {
      dispatch(removeTranslateIds(needTranslatePostIds));
      dispatch(
        setPostTranslate({
          ids: needTranslatePostIds,
          data: {},
          status: FetchStatus.NOT_FETCHED,
          showTranslate: false,
        }),
      );
    }
  }, [needTranslatePostIds, dispatch, postTranslateMap, userInfo.translation]);
};

export const useFetchAutoCommentTranslate = () => {
  const { commentTranslateMap, needTranslateCommentIds } = useMapModule();
  const userInfo = useSelector(
    (state: { loginReducer: Login }) => state.loginReducer.userInfo,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.translation === 1 && needTranslateCommentIds.length) {
      const fetchIds = [];
      needTranslateCommentIds.forEach(id => {
        if (!commentTranslateMap[id]) {
          fetchIds.push(id);
        }
      });
      dispatch(removeCommentTranslateIds(needTranslateCommentIds));
      if (fetchIds.length) {
        dispatch(fetchCommentTranslateAsync(fetchIds));
      }
    } else if (needTranslateCommentIds.length) {
      dispatch(removeCommentTranslateIds(needTranslateCommentIds));
      dispatch(
        setCommentTranslate({
          ids: needTranslateCommentIds,
          data: {},
          status: FetchStatus.NOT_FETCHED,
          showTranslate: false,
        }),
      );
    }
  }, [
    needTranslateCommentIds,
    dispatch,
    commentTranslateMap,
    userInfo.translation,
  ]);
};
