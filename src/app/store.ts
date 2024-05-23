import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { tasksApi } from '../services/tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import localTasksReducer from '../features/tasks/tasksSlice';
import networkReducer from '../features/network/networkSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedLocalTasksReducer = persistReducer(persistConfig, localTasksReducer);
const persistedNetworkReducer = persistReducer(persistConfig, networkReducer);

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    localTasks: persistedLocalTasksReducer,
    network: persistedNetworkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(tasksApi.middleware), // Add the RTK Query middleware here
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
