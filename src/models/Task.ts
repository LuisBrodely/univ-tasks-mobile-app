export interface TaskResponse {
  message: string;
  data:    Task;
}

export interface TasksResponse {
  message: string;
  data:    Task[];
}

export interface Task {
  title:       string;
  description: string;
  status:      boolean;
  _id:         string;
  createdAt:   Date;
  updatedAt:   Date;
  __v:         number;
}

export interface AddTaskRequest {
  _id?:         string;
  title:       string;
  description: string;
  status:      boolean;
}

export interface UpdateTaskRequest {
  _id?:         string;
  status:      boolean;
}

