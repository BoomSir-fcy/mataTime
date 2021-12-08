import { useEffect, useRef, useState, useCallback } from 'react'
// import { getHistoryList, signIn, collectpoints, receivedsg, getFrindList } from 'config/axios'
import { signMessage } from 'utils/web3React';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
// import { useAppDispatch } from 'state';
// import { fetchTaskListAsync, fetchSeasonInfo } from 'state/mission';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import random from 'lodash/random';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { TaskInfo, taskContents } from '../type';


// 任务列表
export const useTaskList = () => {
  const [dailyList, setDailyList] = useState<TaskInfo[]>([]);
  const [weekList, setWeekList] = useState<TaskInfo[]>([]);
  const [specialList, setSpecialList] = useState<TaskInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    setLoading(true);
    try {
      const res = await Api.TaskApi.getTaskStatus();
      if (Api.isSuccess(res)) {
        setDailyList(res.data.filter((v: TaskInfo) => v.task_type === 1));
        setWeekList(res.data.filter((v: TaskInfo) => v.task_type === 2));
        setSpecialList(res.data.filter((v: TaskInfo) => v.task_type === 3));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }

  }

  return { dailyList, weekList, specialList, loading };
}

// 领取任务
export const useReceive = async (taskId: number) => {
  try {
    const res = await Api.TaskApi.receive(taskId);
    return res;
  } catch (error) {
    throw new Error('Receive Error');
  }
}

// 签到
export const useSignIn = async (dispatch: any, account: string, library: any, OperationType: number, TaskID?: number, TaskType?: number) => {
  // OperationType
  // 1 签到
  // 2 领取积分
  // 3 领取dsg
  const SginRaw = {
    task_id: TaskID ? TaskID : 0,
    task_type: TaskType ? TaskType : 0,
    operation_type: OperationType,
    sign_time: Math.floor(new Date().getTime() / 1000),
    nonce: random(0, 0xffff_fff)
  }
  const data = {
    ...SginRaw,
    encode_data: ''
  }
  try {
    data.encode_data = await signMessage(library, account, JSON.stringify(SginRaw));
    try {
      let res
      if (OperationType === 1) {
        // 签到
        // res = await signIn(data)
      } else if (OperationType === 2) {
        // res = await collectpoints(data)
      } else if (OperationType === 3) {
        // res = await receivedsg(data)
      }
      // dispatch(fetchTaskListAsync({ account }))
      // dispatch(fetchSeasonInfo(account))
      if (res.code === 1 || res.code === 20008) {
        return res
      } else {
        throw new Error(res.code);
      }

    } catch (error) {
      throw new Error('signIn Error');
    }
  } catch (error) {
    console.error(error);
    throw new Error('signMessage Error');
  }
}

export const useCountdownTime = (endTime: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(null)
  useEffect(() => {
    const startCountdown = async () => {
      const nowTime = Math.floor(new Date().getTime() / 1000)
      setSecondsRemaining(endTime - nowTime)

      if (endTime > nowTime) {
        if (timer.current) {
          clearInterval(timer.current)
        }
        timer.current = setInterval(() => {
          setSecondsRemaining(endTime - Math.floor(new Date().getTime() / 1000))
        }, 1000)
      }
    }

    startCountdown()

    return () => {
      clearInterval(timer.current)
    }
  }, [setSecondsRemaining, endTime, timer])

  return secondsRemaining
}

// 获取任务积分历史
export const useFetchTaskHistory = () => {
  const { account } = useWeb3React()
  const [list, setList] = useState<number[]>([])
  const [page, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(15)
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (account) {
      getList()
    }
  }, [page, account])
  const getList = () => {
    setLoading(true)  // 设为请求状态
    // getHistoryList({
    //     address: account,
    //     page,
    //     pageSize
    // }).then((res: any) => {
    //     const temp = res.data.pointHistory
    //     const nowList = page === 1 ? temp : [...list, ...temp]
    //     if (page * pageSize >= res.data.totalSize) {
    //         setEnd(true)
    //     }
    //     setList(nowList)
    // }).finally(() => {
    //     setLoading(false)  // 请求完毕置为false
    // })
  }

  return { list, page, end, setPageNum, loading }
}
// 获取邀请好友列表
export const useFetchInviteFriendsList = () => {
  const { account } = useWeb3React()
  const [list, setList] = useState([])
  const [page, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (account) {
      getList()
    }
  }, [page, account])
  const getList = () => {
    setLoading(true)  // 设为请求状态
    // getFrindList({
    //     address: account,
    //     page,
    //     pageSize
    // }).then((res: any) => {
    //     if (res.code === 1) {
    //         const temp = res.data.seasonInvite
    //         const nowList = page === 1 ? temp : [...list, ...temp]
    //         if (page * pageSize >= res.data.totalSize) {
    //             setEnd(true)
    //         }
    //         setList(nowList)
    //     }
    // }).finally(() => {
    //     setLoading(false)  // 请求完毕置为false
    // })
  }

  return { list, page, end, setPageNum, loading }
}

// 获取任务名称和任务描述
export const GetTaskName = (taskNameId: number) => {
  return taskContents.filter(v => v.id === taskNameId)[0] || { name: 'Mystery quests', describe: 'Mystery quests' };
}

