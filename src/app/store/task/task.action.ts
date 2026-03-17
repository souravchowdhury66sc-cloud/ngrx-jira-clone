import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Task } from "./task.model";

export const TaskAction = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
  }
});
