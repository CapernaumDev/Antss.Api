import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const getAppState = createFeatureSelector<AppState>(
  'app'
);

export const selectIsSigningIn = createSelector(
  getAppState,
  (state) => state.status === 'loading'
);

export const selectCurrentUser = createSelector(
  getAppState,
  (state) => state.currentUser
);

export const selectAssignableUsers = createSelector(
  getAppState,
  (state) => state.assignableUsers
);

export const selectOffices = createSelector(
  getAppState,
  (state) => state.offices
);

export const selectUserTypes = createSelector(
  getAppState,
  (state) => state.userTypes
);

export const selectAfterLoginRedirect = createSelector(
  getAppState,
  (state) => state.afterLoginRedirect
);

export const selectTicketList = createSelector(
  getAppState,
  (state) => state.ticketListItems
);