import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useWeb3React } from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { fetchTaskListAsync } from './reducer'
import { TaskState } from './type'
import { State } from '../types'

export const useFetchTask = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchTaskListAsync())
  }, [dispatch])
}


export const useTask = (): TaskState => {
  const task = useSelector((state: State) => state.task)
  return task
}