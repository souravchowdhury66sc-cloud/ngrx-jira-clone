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
  })),
  //add
  on(TaskAction.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  //update
  on(TaskAction.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? { ...t, ...task } : t),
  })),
  //delete
  on(TaskAction.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId),
  })),
  on(TaskAction.addTaskFailure,TaskAction.updateTaskFailure,TaskAction.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error
  })),

);
