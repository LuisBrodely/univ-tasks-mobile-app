import NetInfo from '@react-native-community/netinfo';
import { getTasks as getLocalTasks, clearTasks } from './localStorage';
import { useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../services/tasks';

export const syncLocalTasks = async () => {
  const localTasks = await getLocalTasks();
  
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  for (const task of localTasks) {
    if (task.status) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
  }

  await clearTasks();
};

export const monitorNetwork = () => {
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncLocalTasks();
    }
  });
};
