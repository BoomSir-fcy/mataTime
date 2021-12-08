import { Http } from '../http';

export class TaskApi extends Http {
  // 领取任务奖励
  async receive(task_id: number) {
    const res = await this.post('/v1/task/receive', { task_id });
    return res;
  }
  // 任务列表
  async getTaskList() {
    const res = await this.get('/v1/task/list');
    return res;
  }
  // 用户任务列表
  async getTaskStatus() {
    const res = await this.get('/v1/task/status');
    return res;
  }
}
