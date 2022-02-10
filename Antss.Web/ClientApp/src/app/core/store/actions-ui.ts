import { createAction, props } from '@ngrx/store';
import { LoginCredential } from '../models/login-credential';
import { TicketListItem } from '../models/ticket/ticket-list-item';

export const loginWithCredentials = createAction(
    '[Login Page] Login',
    props<{ loginCredential: LoginCredential }>()
);

export const logoutUserInitiated = createAction(
    '[Nav Menu] Logout'
);

export const loadTicketsRequested = createAction(
    '[Ticket List] Load Tickets Requested',
    props<{ includeClosed: boolean }>()
);

export const ticketStatusUpdatedByUser = createAction(
    '[Ticket Board] Ticket Status Updated',
    props<{ ticket: TicketListItem, boardColumnIndex: number | null }>()
);

export const loadTicketBoardRequested = createAction(
    '[Ticket Board] Load Ticket Board Requested',
    props<{ includeClosed: boolean }>()
);

export const loadUserListRequested = createAction(
    '[User List] Load User List Requested'
);