import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "./task.service";
import { TaskAction } from "./task.action";
import { switchMap, map ,of,catchError} from "rxjs";

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskAction.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskAction.loadTasksFailure({ error: error.message })))
        )
      )
    ));
    //add
      addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskAction.adddTask),
        switchMap(({ taskData }) =>
          this.taskService.addTask(taskData).pipe(
            map((docRef) => TaskAction.addTaskSuccess({ task : { id: docRef.id, ...taskData } })),
            catchError((error) => of(TaskAction.addTaskFailure({ error: error.message })))
          )
        )
      ));
    //update
    updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskAction.updateTask),
        switchMap(({ task }) =>
          this.taskService.updateTask(task).pipe(
            map(() => TaskAction.updateTaskSuccess({ task })),
            catchError((error) => of(TaskAction.updateTaskFailure({ error: error.message })))
          )
        )
      ));

    //delete
    deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskAction.deleteTask),
        switchMap(({ taskId }) =>
          this.taskService.deleteTask(taskId).pipe(
            map(() => TaskAction.deleteTaskSuccess({ taskId })),
            catchError((error) => of(TaskAction.deleteTaskFailure({ error: error.message })))
          )
        )
      ));
}
