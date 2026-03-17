import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.model";
import { authActions } from "./auth.action";

export const initialState: AuthState = {
  user: null,
  email: null,
  isLoading: false,
  error: null,
  uid: undefined
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, authActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(authActions.loginSuccess, authActions.registerSuccess, (state, { uid, email }) => ({
    ...state,
    isLoading: false,
    error: null,
    uid,
    email
  })),
   on(authActions.loginFailure, authActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(authActions.logoutSuccess, () => initialState)
);
