
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

export const taskContents = [
  {
    id: 1,
    name: 'SignIn',
    describe: 'Log in to the platform every day'
  },
  {
    id: 2,
    name: 'Post',
    describe: 'You can get it by posting a post for the first time every day'
  },
  {
    id: 3,
    name: 'TodayBrowsePosts',
    describe: 'Get 100 seconds of time reading per day'
  },
  {
    id: 4,
    name: 'Comment',
    describe: '3 comments per day'
  },
  {
    id: 5,
    name: 'WeekBrowsePosts',
    describe: '1500 time is consumed for reading posts in the week'
  },
  {
    id: 6,
    name: 'WeekAddFans',
    describe: 'A total of 30 new fans are added every week'
  },
  {
    id: 7,
    name: 'ContinuousSignInSevenDays',
    describe: 'Log in 7 times a week'
  },
  {
    id: 8,
    name: 'ContinuousSignInThirtyDays',
    describe: 'The number of fans reached 2000'
  },
  {
    id: 9,
    name: 'TwoThousandFans',
    describe: 'Continuous login for 30 days'
  }
]
