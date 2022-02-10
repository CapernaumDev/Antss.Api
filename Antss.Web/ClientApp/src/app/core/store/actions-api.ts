import { createAction, props } from '@ngrx/store';
import { BoardColumn } from '../models/board-column';
import { LoginResult } from '../models/login-result';
import { TicketListItem } from '../models/ticket/ticket-list-item';
import { UserListItem } from '../models/user/user-list-item';

export const loginSuccess = createAction(
    '[Login API] Login Success',
    props<{ loginResult: LoginResult }>()
);

export const loginFailure = createAction(
    '[Login API] Login Failure',
    props<{ message: string }>()
);

export const loadTicketsSuccess = createAction(
    '[Ticket API] Load Tickets Success',
    props<{ tickets: TicketListItem[] }>()
);

export const loadTicketsFailure = createAction(
    '[Ticket API] Load Tickets Failure'
);

export const loadTicketBoardSuccess = createAction(
    '[Ticket API] Load Ticket Board Success',
    props<{ board: BoardColumn<TicketListItem>[] }>()
);

export const loadTicketBoardFailure = createAction(
    '[Ticket API] Load Ticket Board Failure'
);

export const loadUserListSuccess = createAction(
    '[User API] Load User List Success',
    props<{ users: UserListItem[] }>()
);

export const loadUserListFailure = createAction(
    '[User API] Load User List Failure'
);