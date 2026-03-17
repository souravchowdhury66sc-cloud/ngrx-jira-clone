import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ uid: string; email: string }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{ name:string; email: string; password: string }>(),
    'Register Success': props<{ uid: string; email: string }>(),
    'Register Failure': props<{ error: string }>(),
      'Logout': emptyProps(),
      'Logout Success': emptyProps(),
}
})
