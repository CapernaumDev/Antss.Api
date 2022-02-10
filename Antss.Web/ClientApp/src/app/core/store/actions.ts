import { createAction, props } from '@ngrx/store';
import { AppData } from '../models/app-data';
import { BoardColumn } from '../models/board-column';
import { LoginCredential } from '../models/login-credential';
import { LoginResult } from '../models/login-result';
import { OptionItem } from '../models/option-item';
import { TicketListItem } from '../models/ticket/ticket-list-item';
import { UserListItem } from '../models/user/user-list-item';

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

export const ticketCreated = createAction(
    '[Server Push] Ticket Created',
    props<{ 
        ticket: TicketListItem,
        boardColumnIndex: number | null,
        initiatedByUserId: number
    }>()
);

export const ticketStatusUpdatedByServer = createAction(
    '[Server Push] Ticket Status Updated',
    props<{ 
        ticket: TicketListItem, 
        boardColumnIndex: number | null,
        initiatedByUserId: number
    }>()
);

export const ticketStatusUpdatedByUser = createAction(
    '[Ticket Board] Ticket Status Updated',
    props<{ ticket: TicketListItem, boardColumnIndex: number | null }>()
);

export const loadTicketBoardRequested = createAction(
    '[Ticket Board] Load Ticket Board Requested',
    props<{ includeClosed: boolean }>()
);

export const loadTicketBoardSuccess = createAction(
    '[Ticket Board] Load Ticket Board Success',
    props<{ board: BoardColumn<TicketListItem>[] }>()
);

export const loadTicketBoardFailure = createAction(
    '[Ticket Board] Load Ticket Board Failure'
);

export const userCreated = createAction(
    '[Server Push] User Created',
    props<{ user: UserListItem }>()
);

export const userUpdated = createAction(
    '[Server Push] User Updated',
    props<{ user: UserListItem }>()
);

export const loadUserListRequested = createAction(
    '[User List] Load User List Requested'
);

export const loadUserListSuccess = createAction(
    '[User List] Load User List Success',
    props<{ users: UserListItem[] }>()
);

export const loadUserListFailure = createAction(
    '[User List] Load User List Failure'
);

export const ticketAnimationPlayed = createAction(
    '[UI Update on Server Push] Ticket Animation Finished Playing',
    props<{ ticketId: number }>()
)