import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "./users.model";


export const UsersAction = createActionGroup({
source :'Users',
events:{
  'Load Users' : emptyProps(),
  'Load Users Success' : props<{users:User[]}>(),
  'Load Users Failure' : props<{error :string}>(),
}
  });
