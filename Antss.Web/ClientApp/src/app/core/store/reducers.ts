import { createReducer, on } from '@ngrx/store';
import { CurrentUser } from '../models/user/current-user';
import * as AppActions from './actions';
import { initialState } from './app.state';

export const Reducers = createReducer(
    initialState,

    on(AppActions.loginWithCredentials, (state) => ({ ...state, status: 'loading' })),
    on(AppActions.loginWithToken, (state) => ({ ...state, status: 'loading' })),

    on(AppActions.loginSuccess, (state, { loginResult }) => ({
      ...state,
      currentUser: Object.assign(new CurrentUser(), { 
        ...loginResult.user, 
        accessToken: window.btoa(loginResult.accessToken || JSON.parse(localStorage["access-token"])) 
      }),
      status: 'success'
      //todo: appdata
    })),

    on(AppActions.loginFailure, (state) => ({
      ...state,
      status: 'error'
    })),

    on(AppActions.setAfterLoginRedirect, (state, { url }) => ({
      ...state,
      afterLoginRedirect: url
    })),

    on(AppActions.logout, (state) => ({
      ...state,
      currentUser: null,
      status: 'pending',
      afterLoginRedirect: ''
    }))
  );