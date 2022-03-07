import { Api } from 'apis';
import { FetchStatus } from 'config/types';
import { useCallback, useEffect, useState } from 'react';

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
