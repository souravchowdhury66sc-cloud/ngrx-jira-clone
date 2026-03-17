//get all task
//todo
//progress
//done
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./task.model";

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectTodoTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === 'todo')
);
export const selectInProgressTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === 'in-progress')
);

export const selectDoneTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === 'done')
);
