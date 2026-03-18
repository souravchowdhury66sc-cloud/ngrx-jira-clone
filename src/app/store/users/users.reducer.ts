import { createReducer, on } from "@ngrx/store";
import { UsersAction } from "./users.action";
import { UsersState } from "./users.model";

export const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersReducers = createReducer(
  initialState,

  on(UsersAction.loadUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UsersAction.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    error: null,
  })),
  on(UsersAction.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))

)
