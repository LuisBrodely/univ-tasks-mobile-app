import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TaskResponse, TasksResponse, AddTaskRequest, UpdateTaskRequest } from '../models/Task'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, void>({
      query: () => 'tasks',
      providesTags: ['Task'],
    }),
    getTask: builder.query<TaskResponse, string>({
      query: (id) => `tasks/${id}`,
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<TaskResponse, AddTaskRequest>({
      query: (task) => ({
        url: `tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<TaskResponse, UpdateTaskRequest>({
      query: (task) => ({
        url: `tasks/${task._id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<TaskResponse, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi

