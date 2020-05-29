import { createAction, props } from '@ngrx/store';
// import { userInfo } from '../reducers/users.reducers'
export const log = createAction('[Users Component] Log');
export const authorize = createAction('[Users Component] Authorize', props<{token: string, login: string}>());
export const unauthorize = createAction('[Users Component] Unauthorize');