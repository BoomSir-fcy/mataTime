import { Api } from 'apis';

// 任务列表
export const getTaskListData = async () => {
  try {
    const res = await Api.TaskApi.getTaskStatus();
    if (Api.isSuccess(res)) {
      return res.data || [];
    } else {
      throw new Error("errCode");
    }
  } catch (error) {
    return []
  }
}