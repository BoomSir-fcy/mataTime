import { useCallback, useEffect, useRef, useState } from 'react'
import { Api } from 'apis';
import { taskContents } from './config';
import { useDispatch } from 'react-redux';
import { fetchTaskListAsync } from 'store/task/reducer';

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
  if (taskGroupId === 1) return 'ACTIVITY';
  if (taskGroupId === 2) return 'CREATE';
  if (taskGroupId === 3) return 'INVITE';
  if (taskGroupId === 4) return 'REPORT';
  return 'ACTIVITY';
}
