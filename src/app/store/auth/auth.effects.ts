import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { authActions } from "./auth.action";
import { catchError, map, mergeMap, Observable, of, switchMap, tap } from "rxjs";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  // Define effects for login, register, logout, and authSuccess here
  //login
login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.login),
    switchMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
        map(userCred => authActions.loginSuccess({ uid: userCred.user.uid,
          email: userCred.user.email || '' })),
          catchError(error => of(authActions.loginFailure({ error: error.message })))
        // Handle login failure if needed
      ))
  ));

//register
register$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.register),
    switchMap(({ name, email, password }) =>this.authService.register(email, password).pipe(
      mergeMap(userCred =>
        this.authService.createUserDocument(userCred.user.uid, email, name).pipe(
        map(() => authActions.registerSuccess({ uid: userCred.user.uid,
           email: userCred.user.email || '' })),
        catchError(error => of(authActions.registerFailure({ error: error.message })))
      )),
      catchError(error => of(authActions.registerFailure({ error: error.message })))
    ))
  ));

//logout
logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.logout),
    switchMap(() =>
      this.authService.logout().pipe(
        map(() => authActions.logoutSuccess()),
        tap(() => this.router.navigate(['/login'])),
        catchError(error => of(authActions.loginFailure({ error: error.message })))
      ))
  ));
//authSuccess
authSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.loginSuccess, authActions.registerSuccess),
    tap(() => this.router.navigate(['/board']))
  ),
  { dispatch: false }
);
}

