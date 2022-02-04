import { createAction, props } from '@ngrx/store';
import { LoginCredential } from '../models/login-credential';
import { LoginResult } from '../models/login-result';

export const loginWithCredentials = createAction(
    '[Login Page] Login',
    props<{ loginCredential: LoginCredential }>()
);

export const loginWithToken = createAction(
    '[App Startup] Login',
    props<{ loginCredential: LoginCredential }>()
);

export const loginSuccess = createAction(
    '[Login API] Login Success',
    props<{ loginResult: LoginResult }>()
);

export const loginFailure = createAction(
    '[Login API] Login Failure',
    props<{ message: string }>()
);

export const setAfterLoginRedirect = createAction(
    '[Auth Guard] Set After Login Redirect',
    props<{ url: string }>()
)

export const logout = createAction(
    '[Nav Menu] Logout'
)
