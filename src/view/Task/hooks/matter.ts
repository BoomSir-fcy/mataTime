import { useEffect, useRef, useState } from 'react'
import { Api } from 'apis';
import { taskContents } from './config';
import { fetchTaskListAsync } from 'store/task/reducer';
import { Group } from '../type';

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
