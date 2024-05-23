import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, AddTaskRequest, UpdateTaskRequest } from '../models/Task';

const TASKS_STORAGE_KEY = '@tasks';

export const saveTask = async (task: AddTaskRequest) => {
  const tasks = await getTasks();
  tasks.push({ ...task, _id: String(Date.now()), createdAt: new Date(), updatedAt: new Date(), __v: 0 });
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasks = async (): Promise<Task[]> => {
  const tasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const updateTask = async (task: UpdateTaskRequest) => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map((t) =>
    t._id === task._id ? { ...t, status: task.status } : t
  );
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
};

export const deleteTask = async (id: string) => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter((t) => t._id !== id);
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
};

export const clearTasks = async () => {
  await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
};
