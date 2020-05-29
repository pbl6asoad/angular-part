import { createReducer, createSelector, on } from '@ngrx/store';
import { log, authorize, unauthorize } from '../actions/users.actions';


export interface userInfo {
 isAuthorized: boolean,
 token?: string,
 right?: string, 
 userData: {
   name?: string,
   age?: number,
   login?: string,
   password?: string,
   eMail?: string
 }
}

export const initialState: userInfo = {
  isAuthorized: false,
  token: "",
  userData: {}
};

const _userReducer = createReducer(initialState,
  on(log, (state) => {
    console.log(state);
    return state
  }),
  on(authorize, (state, { token, login }) => ({ ...state, isAuthorized: true, token: token, userData: {login: login,} })),
  
//   {
//     console.log('mewo');
//     return {
//       ...state,
//       isAuthorized: true,
//       token: 'a',
//       userData: {
//         login: login,
//       }
//   }
// }

// ),
  on(unauthorize, (state) => {
    state = initialState
    return state
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}

export const getIsAuth = (data) => data.user.isAuthorized;


export const getLogin = (data) => data.user.userData.login;

// export const selectAuthData = createSelector(
//   getIsAuth,
//   (state: State) => {
//     console.log(data);
//     return data
//   }
// )