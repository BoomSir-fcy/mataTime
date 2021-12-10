
export interface TaskInfo {
  task_id: number;
  task_type?: number;
  task_name?: string;
  task_name_id?: number;
  now_time?: number;
  end_time?: number;
  matter?: number;
  status?: number;
  Expand?: ExpandInfo | null;
}

type ExpandInfo = {
  max: number;
  now: number;
}

export enum Status {
  UnCompleted = 1, // 未完成
  Completed = 2, // 已完成
  Received = 3 // 已领取奖励
}
