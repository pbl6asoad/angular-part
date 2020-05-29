import { createReducer, on } from '@ngrx/store';
import { log } from '../actions/users.actions';

export const initialState = "KEKW";

const _counterReducer = createReducer(initialState,
  on(log, (state) => {
    console.log(state);
    return state
  })
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}