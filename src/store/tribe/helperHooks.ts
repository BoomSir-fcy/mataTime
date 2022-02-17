import { Api } from "apis"
import { FetchStatus } from "config/types"
import { useCallback, useEffect, useState } from "react"

interface TopicDataRes {
  list: Api.Tribe.TopicInfo[];
  fetchStatus: FetchStatus
}

interface PostDraftRes {
  data: Api.Tribe.PostDraftInfo;
  fetchStatus: FetchStatus
}
export const useFetchTribeTopicList = (tribe_id) => {
  const [data, setData] = useState<TopicDataRes>({
    list: [],
    fetchStatus: FetchStatus.NOT_FETCHED
  })

  const fetchData = useCallback(async (id) => {
    try {
      const res = await Api.TribeApi.getTribeTopicList({ tribe_id: id })
      if (Api.isSuccess(res)) {
        console.log(res)
        setData({
          list: res.data,
          fetchStatus: FetchStatus.SUCCESS,
        })
        return;
      }
      throw new Error('')
    } catch (error) {
      setData(prev => ({
        ...prev,
        fetchStatus: FetchStatus.FAILED,
      }))
    }
  }, [])

  useEffect(() => {

    if (tribe_id) {
      fetchData(tribe_id)
    }
  }, [tribe_id, fetchData])

  return { data, updateList: fetchData }
}

export const useFetchTribePostDraft = (tribe_id) => {
  const [data, setData] = useState<PostDraftRes>({
    data: null,
    fetchStatus: FetchStatus.NOT_FETCHED
  })

  const fetchData = useCallback(async (id) => {
    try {
      const res = await Api.TribeApi.getTribePostDraft({ tribe_id: id })
      if (Api.isSuccess(res)) {
        console.log(res)
        setData({
          data: res.data,
          fetchStatus: FetchStatus.SUCCESS,
        })
        return;
      }
      throw new Error('')
    } catch (error) {
      console.error(error)
      setData(prev => ({
        ...prev,
        fetchStatus: FetchStatus.FAILED,
      }))
    }
  }, [])

  useEffect(() => {
    
    if (tribe_id) {
      fetchData(tribe_id)
    }
  }, [tribe_id, fetchData])

  return { data, updateList: fetchData }
}