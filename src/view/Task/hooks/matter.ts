import { useEffect, useRef, useState } from 'react'
import { Api } from 'apis';
import { TaskInfo } from '../type';
import { taskContents } from './config';
import { useFetchTask, useTask } from 'store/task/hooks';


// 任务列表
export const useTaskList = () => {
  const [dailyList, setDailyList] = useState<TaskInfo[]>([]);
  const [weekList, setWeekList] = useState<TaskInfo[]>([]);
  const [specialList, setSpecialList] = useState<TaskInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useFetchTask();

  const { taskList } = useTask();

  useEffect(() => {
    getList();
  }, [taskList])

  const getList = async () => {
    setLoading(true);
    try {
      const { data } = taskList;
      setDailyList(data.filter((v: TaskInfo) => v.task_type === 1));
      setWeekList(data.filter((v: TaskInfo) => v.task_type === 2));
      setSpecialList(data.filter((v: TaskInfo) => v.task_type === 3));
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return { dailyList, weekList, specialList, loading };
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
export const receive = async (taskId: number) => {
  try {
    const res = await Api.TaskApi.receive(taskId);
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

