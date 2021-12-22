import { useEffect, useRef, useState } from 'react'
import { Api } from 'apis';
import { taskContents } from './config';
import { fetchTaskListAsync } from 'store/task/reducer';
import { Group } from '../type';
import { useWeb3React } from '@web3-react/core';

// 获取邀请好友列表
export const useFetchInviteFriendsList = () => {
  const { account } = useWeb3React()
  const [list, setList] = useState([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (account) {
      getList()
    }
  }, [pageNum, account])
  const getList = () => {
    setLoading(true);
    Api.TaskApi.getInviteList(pageNum, pageSize).then((res: any) => {
      if (Api.isSuccess(res)) {
        const temp = res.data;
        setList(temp?.Users);
        setTotal(temp?.total_size);
        setPageNum(temp?.now_page);
        setPageSize(temp?.page_size);
      }
    }).catch(() => {
      setList([]);
    }).finally(() => {
      setLoading(false);
    })
  }

  return { list, pageNum, total, setPageNum, loading }
}

// 签到
export const useSignIn = () => {
  useEffect(() => {
    onSignIn();
  }, [])

  const onSignIn = async () => {
    try {
      const res = await Api.TaskApi.SignIn();
      return res;
    } catch (error) {
      throw new Error('SignIn Error');
    }
  }
}

// 领取任务
export const receive = async (dispatch: any, taskId: number) => {
  try {
    const res = await Api.TaskApi.receive(taskId);
    await dispatch(fetchTaskListAsync({ isSignIn: false }))
    return res;
  } catch (error) {
    throw new Error('Receive Error');
  }
}

//倒计时
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

// 获取任务名称和任务描述
export const GetTaskName = (taskNameId: number) => {
  return taskContents.filter(v => v.id === taskNameId)[0] || { name: 'Mystery quests', describe: 'Mystery quests', count: 0 };
}


// 获取任务类型
export const GetTaskTag = (taskGroupId: number) => {
  if (taskGroupId === Group.ACTIVITY) return 'activity';
  if (taskGroupId === Group.CREATE) return 'create';
  if (taskGroupId === Group.INVITE) return 'invite';
  if (taskGroupId === Group.REPORT) return 'report';
  return 'activity';
}
