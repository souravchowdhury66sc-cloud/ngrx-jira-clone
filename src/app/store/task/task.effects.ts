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
    )
  )
};
