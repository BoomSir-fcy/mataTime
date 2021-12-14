export interface TaskState {
  taskList: {
    data: TaskList[]
    dataLoaded: boolean
  }
}

export interface TaskList {
  task_id: number;
  task_type: number;
  task_name: string;
  task_name_id: number;
  now_time: number;
  end_time: number;
  matter: number;
  status: number;
  Expand: any;
}