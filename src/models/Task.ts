export interface TaskResponse {
  message: string;
  data: Task;
}

export interface TasksResponse {
  message: string;
  data: Task[];
}

export interface Task {
  uuid: string;
  title: string;
  description: string;
  status: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddTaskRequest {
  _id: string;
  uuid: string;
  title: string;
  description: string;
  status: boolean;
}

export interface UpdateTaskRequest {
  _id: string;
  status: boolean;
}
