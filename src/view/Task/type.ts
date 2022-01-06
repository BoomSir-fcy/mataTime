export const variants = {
  ACTIVITY: "activity",
  CREATE: "create",
  INVITE: "invite",
  REPORT: "report",
} as const;

export type Variant = typeof variants[keyof typeof variants];
export interface TaskInfo {
  task_id: number;
  task_type?: number;
  task_name?: string;
  task_name_id?: number;
  task_group?: number;
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

export interface TaskContentProps {
  taskGroupId: number,
  taskList: TaskInfo[]
}

export enum Status {
  UnCompleted = 1, // 未完成
  Completed = 2, // 已完成
  Received = 3 // 已领取奖励
}

export enum Group {
  ACTIVITY = 1,
  CREATE = 2,
  INVITE = 3,
  REPORT = 4
}

export interface TagProps {
  variant?: Variant;
}

// 可邀请的nft信息
export interface InvitableNftInfo {
  image?: string;
  name?: string;
  token?: string;
  token_id?: string;
}

// 邀请码信息
export interface CodeInfo {
  id: number;
  ntf_token?: string;
  nftid?: string;
  code?: string;
  code_hash?: string;
  lock_hash?: string;
  status?: number;
  created_at?: number;
  locked_at?: string;
  used_at?: string;
  used_uid?: string;
}