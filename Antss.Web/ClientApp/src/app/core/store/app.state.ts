import { ServerConfirmationEvent } from "../interfaces/server-confirmation-event";
import { BoardColumn } from "../models/board-column";
import { OptionItem } from "../models/option-item";
import { TicketListItem } from "../models/ticket/ticket-list-item";
import { CurrentUser } from "../models/user/current-user";
import { UserListItem } from "../models/user/user-list-item";

export interface AppState {
    currentUser: CurrentUser | null;
    status: 'pending' | 'loading' | 'error' | 'success';
    afterLoginRedirect: string
    assignableUsers: OptionItem[],
    offices: OptionItem[],
    userTypes: OptionItem[],
    ticketListItems: TicketListItem[],
    ticketBoard: BoardColumn<TicketListItem>[],
    showSuccessForTicket: ServerConfirmationEvent | null,
    userListItems: UserListItem[]
}

export const initialState: AppState = {
    currentUser: null,
    status: 'pending',
    afterLoginRedirect: '',
    assignableUsers: [],
    offices: [],
    userTypes: [],
    ticketListItems: [],
    ticketBoard: [],
    showSuccessForTicket: null,
    userListItems: []
};
