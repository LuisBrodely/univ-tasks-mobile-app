import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTaskRequest, Task, UpdateTaskRequest } from '../../models/Task';
import { AppThunk, RootState } from '../../app/store';
import { tasksApi } from '../../services/tasks';

interface LocalTasksState {
  tasks: AddTaskRequest[];
  updateTasks: UpdateTaskRequest[];
  deleteTasks: string[];
}

const initialState: LocalTasksState = {
  tasks: [],
  updateTasks: [],
  deleteTasks: [],
};

const localTasksSlice = createSlice({
  name: 'localTasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addLocalTask: (state, action: PayloadAction<AddTaskRequest>) => {
      state.tasks.push(action.payload);
    },
    updateLocalTask: (state, action: PayloadAction<UpdateTaskRequest>) => {
      state.updateTasks.push(action.payload);
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          status: action.payload.status,
        };
      }
    },
    deleteLocalTask: (state, action: PayloadAction<string>) => {
      state.deleteTasks.push(action.payload);
      const index = state.tasks.findIndex((task) => task._id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    clearLocalTasks: (state) => {
      state.tasks = [];
      state.updateTasks = [];
      state.deleteTasks = [];
    },
  },
});

export const { addLocalTask, updateLocalTask, deleteLocalTask, clearLocalTasks, setTasks } = localTasksSlice.actions;

export default localTasksSlice.reducer;

export const selectLocalTasks = (state: RootState) => state.localTasks.tasks;

export const syncTasks = (): AppThunk => async (dispatch, getState) => {
  const { tasks, updateTasks, deleteTasks } = getState().localTasks;

  for (const task of tasks) {
    if (task._id) {
      const updateTask = updateTasks.find((updateTask) => updateTask._id === task._id);
      if (updateTask) {
        dispatch(tasksApi.endpoints.updateTask.initiate({ task: updateTask, id: task._id }));
        console.log('Task updated', updateTask);
      }
    } else {
      dispatch(tasksApi.endpoints.addTask.initiate(task));
      console.log('Task added', task);
    }
  }

  for (const taskId of deleteTasks) {
    dispatch(tasksApi.endpoints.deleteTask.initiate(taskId));
    console.log('Task deleted', taskId)
  }

  dispatch(clearLocalTasks());
};
