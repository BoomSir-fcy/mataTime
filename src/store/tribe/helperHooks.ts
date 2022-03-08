import { Api } from 'apis';
import { LoadType, MoreOperatorEnum } from 'components';
import { FetchStatus } from 'config/types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDeletePostId, addUnFollowUserId, removeUnFollowUserId } from 'store/mapModule/actions';
import { fetchTribePostDetailAsync, fetchUserInfoAsync } from 'store/mapModule/reducer';

interface TopicDataRes {
  list: Api.Tribe.TopicInfo[];
  fetchStatus: FetchStatus;
}

interface PostDraftRes {
  data: Api.Tribe.PostDraftInfo;
  fetchStatus: FetchStatus;
}
export const useFetchTribeTopicList = tribe_id => {
  const [data, setData] = useState<TopicDataRes>({
    list: [],
    fetchStatus: FetchStatus.NOT_FETCHED,
  });

  const fetchData = useCallback(async id => {
    try {
      const res = await Api.TribeApi.getTribeTopicList({ tribe_id: id });
      if (Api.isSuccess(res)) {
        console.log(res);
        setData({
          list: res.data,
          fetchStatus: FetchStatus.SUCCESS,
        });
        return;
      }
      throw new Error('');
    } catch (error) {
      setData(prev => ({
        ...prev,
        fetchStatus: FetchStatus.FAILED,
      }));
    }
  }, []);

  useEffect(() => {
    if (tribe_id) {
      fetchData(tribe_id);
    }
  }, [tribe_id, fetchData]);

  return { data, updateList: fetchData };
};

export const useFetchTribePostDraft = tribe_id => {
  const [data, setData] = useState<PostDraftRes>({
    data: null,
    fetchStatus: FetchStatus.NOT_FETCHED,
  });

  const fetchData = useCallback(async id => {
    try {
      const res = await Api.TribeApi.getTribePostDraft({ tribe_id: id });
      if (Api.isSuccess(res)) {
        console.log(res);
        setData({
          data: res.data,
          fetchStatus: FetchStatus.SUCCESS,
        });
        return;
      }
      throw new Error('');
    } catch (error) {
      console.error(error);
      setData(prev => ({
        ...prev,
        fetchStatus: FetchStatus.FAILED,
      }));
    }
  }, []);

  useEffect(() => {
    if (tribe_id) {
      fetchData(tribe_id);
    }
  }, [tribe_id, fetchData]);

  return { data, updateList: fetchData };
};

interface PostDataInfoRes {
  data: Api.Tribe.PostDataInfo;
  fetchStatus: FetchStatus;
}

export const useFetchTribePostInfo = tribe_id => {
  const [data, setData] = useState<PostDataInfoRes>({
    data: null,
    fetchStatus: FetchStatus.NOT_FETCHED,
  });

  const fetchData = useCallback(async id => {
    try {
      const res = await Api.TribeApi.getTribePostInfo({ id });
      if (Api.isSuccess(res)) {
        console.log(res);
        setData({
          data: res.data,
          fetchStatus: FetchStatus.SUCCESS,
        });
        return;
      }
      throw new Error('');
    } catch (error) {
      console.error(error);
      setData(prev => ({
        ...prev,
        fetchStatus: FetchStatus.FAILED,
      }));
    }
  }, []);

  useEffect(() => {
    if (tribe_id) {
      fetchData(tribe_id);
    }
  }, [tribe_id, fetchData]);

  return { data, updateData: fetchData };
};

// 部落文件列表
export const useFetchFileList = (id: number, page: number) => {
  const [data, setData] = useState({
    data: {
      list: [] as Api.Tribe.FileInfo[],
      page: 0,
      page_size: 0,
      total_count: 0,
    },
    reserved: [] as Api.Tribe.FileInfo[],
    loading: false,
    fetchStatus: FetchStatus.NOT_FETCHED,
  });

  const fetchData = useCallback(
    async (tribe_id, page) => {
      setData({
        ...data,
        loading: true,
      });
      try {
        const res: any = await Api.TribeApi.getTribeFile({
          tribe_id,
          page,
          page_size: 5,
        });
        setData({
          reserved: page === 1 ? res.data.list : data.reserved,
          data: res.data,
          fetchStatus: FetchStatus.SUCCESS,
          loading: false,
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          fetchStatus: FetchStatus.FAILED,
        }));
      }
    },
    [data],
  );

  useEffect(() => {
    if (id) {
      fetchData(id, page);
    }
  }, [id]);

  return { data, updateData: fetchData };
};

export const useUpdateTribePostInfo = (setNonce, getList, updateList) => {

  const dispatch = useDispatch();

  // 更新列表
  const handleUpdateList = useCallback(
    (newItem: any, type: MoreOperatorEnum = null) => {
      // 折叠和翻译
      if (
        type === MoreOperatorEnum.EXPAND ||
        type === MoreOperatorEnum.TRANSLATE
      ) {
        setNonce(prep => prep + 1);
        return;
      }
      if (type === MoreOperatorEnum.BLOCKUSER) {
        setNonce(prep => prep + 1);
      }
      if (type === MoreOperatorEnum.DELPOST) {
        setNonce(prep => prep + 1);
        dispatch(addDeletePostId(newItem.id)); // FIXME: 有的时候可能用的不是id
        return;
      }
      if (type === MoreOperatorEnum.CANCEL_FOLLOW) {
        setNonce(prep => prep + 1);
        dispatch(addUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      if (type === MoreOperatorEnum.FOLLOW) {
        setNonce(prep => prep + 1);
        dispatch(removeUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      if (
        type === MoreOperatorEnum.FORWARD ||
        type === MoreOperatorEnum.UNFORWARD
      ) {
        getList(LoadType.REFRESH);
        return;
      }
      dispatch(fetchTribePostDetailAsync(newItem.id)); // FIXME: 有的时候可能用的不是id

      updateList(newItem.id, type);
      return;
    },
    [dispatch, setNonce, getList, updateList],
  );

  return {
    handleUpdateList
  }
}
