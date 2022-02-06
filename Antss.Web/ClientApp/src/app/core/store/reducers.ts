import { createReducer, on } from '@ngrx/store';
import { CurrentUser } from '../models/user/current-user';
import * as AppActions from './actions';
import { initialState } from './app.state';
import produce from "immer";

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
    })),

    on(AppActions.loginFailure, (state) => ({
      ...state,
      status: 'error'
    })),

    on(AppActions.setAfterLoginRedirect, (state, { url }) => ({
      ...state,
      afterLoginRedirect: url
    })),

    on(AppActions.setInitialAppData, (state, { appData }) => ({
      ...state,
      assignableUsers: appData.assignableUsers,
      offices: appData.offices,
      userTypes: appData.userTypes
    })),

    on(AppActions.logoutOnServerUnauthorised, AppActions.logoutUserInitiated, (state) => ({
      ...state,
      currentUser: null,
      status: 'pending',
      afterLoginRedirect: ''
    })),

    on(AppActions.updateAssignableUsers, (state, { options }) => ({
        ...state,
        assignableUsers: options
    })),

    on(AppActions.loadTicketsSuccess, (state, { tickets }) => ({
      ...state,
      ticketListItems: tickets
    })),

    on(AppActions.ticketCreated, (state, { ticket }) => produce(state, draft => {
      draft.ticketListItems.push(ticket);
    })),

    on(AppActions.ticketStatusUpdated, (state, { ticket, boardColumnIndex }) => produce(state, draft => {
      let ticketInTicketListStateCollection = draft.ticketListItems.find(x => x.id === ticket.id);
      if (ticketInTicketListStateCollection)
        ticketInTicketListStateCollection.ticketStatus = ticket.ticketStatus;

      let destinationBoardColumn = draft.ticketBoard.find(x => x.title === ticket.ticketStatus);
      if (destinationBoardColumn) {
        for (let i = 0; i < draft.ticketBoard.length; i++) {
          let foundTicketIndex = draft.ticketBoard[i].data.findIndex(x => x.id === ticket.id);
          if (foundTicketIndex > -1) {
            draft.ticketBoard[i].data.splice(foundTicketIndex, 1);
            if (boardColumnIndex && destinationBoardColumn.data.length >= boardColumnIndex)
              destinationBoardColumn.data.splice(boardColumnIndex, 0, ticket);
            else
              destinationBoardColumn.data.push(ticket);
            break;
          }
        }
      }
    })),

    on(AppActions.loadTicketBoardSuccess, (state, { board }) => ({
      ...state,
      ticketBoard: board
    })),
  );