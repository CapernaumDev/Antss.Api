import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAuthenticationFeature = (state: AppState) => state.authentication;
export const selectIsSigningIn = createSelector(
  selectAuthenticationFeature,
  (state) => state.status === 'loading'
);