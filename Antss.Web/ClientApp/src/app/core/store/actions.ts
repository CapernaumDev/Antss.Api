import { createAction, props } from '@ngrx/store';
import { AppData } from '../models/app-data';
import { LoginCredential } from '../models/login-credential';
import { LoginResult } from '../models/login-result';
import { OptionItem } from '../models/option-item';
import { TicketListItem } from '../models/ticket/ticket-list-item';

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

export const logoutUserInitiated = createAction(
    '[Nav Menu] Logout'
)

export const logoutOnServerUnauthorised = createAction(
    '[Error Interceptor server 401] Logout'
)

export const updateAssignableUsers = createAction(
    '[Server Push] Update Assignable User Options',
    props<{ options: OptionItem[] }>()
)

export const setInitialAppData = createAction(
    '[Server Push] Initial App Data',
    props<{ appData: AppData }>()
)

export const loadTicketsRequested = createAction(
    '[Ticket List] Load Tickets Requested',
    props<{ includeClosed: boolean }>()
);

export const loadTicketsSuccess = createAction(
    '[Ticket List] Load Tickets Success',
    props<{ tickets: TicketListItem[] }>()
);

export const loadTicketsFailure = createAction(
    '[Ticket List] Load Tickets Failure'
);