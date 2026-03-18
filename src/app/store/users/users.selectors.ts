import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "firebase/auth";
import { UsersState } from "./users.model";

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.isLoading
);
