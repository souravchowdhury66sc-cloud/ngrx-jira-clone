import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map,of,switchMap,catchError } from "rxjs";
import { UsersService } from "./users.service";
import { UsersAction } from "./users.action";
import { User as FirebaseUser } from '@firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class UsersEffects {
  constructor() {}
  private action$ = inject(Actions);
  private usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersAction.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => UsersAction.loadUsersSuccess({ users })),
          catchError((error) => of(UsersAction.loadUsersFailure({ error: error.message })))
        )
      )
    ));
}
