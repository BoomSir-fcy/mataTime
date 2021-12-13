import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTaskListData } from './getTaskInfo'

export const initialState = {
  taskList: {
    data: [],
    dataLoaded: false,
  }
}

// 任务列表
export const fetchTaskListAsync = createAsyncThunk<any>('task/fetchTaskListAsync', async () => {
  const TaskListData = await getTaskListData()
  return TaskListData
},
)

export const task = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchTaskListAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.taskList.data = action.payload
        state.taskList.dataLoaded = true
      }
    })
  },
})

export default task.reducer
