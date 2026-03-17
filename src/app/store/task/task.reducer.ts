import { createReducer, on } from "@ngrx/store";
import { TaskState } from "./task.model";
import { TaskAction } from "./task.action";


export const InitalState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null
};
export const TaskReducer = createReducer(
  InitalState,
  on(TaskAction.loadTasks, (state) => ({
    ...state,
    isLoading: true
  })),
  on(TaskAction.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoading: false
  })),
  on(TaskAction.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  }))

);
