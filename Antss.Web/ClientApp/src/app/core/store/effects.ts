import * as ApiActions from './actions-api';
import * as PushActions from './actions-push';
import * as SystemActions from './actions-system';
import * as UiActions from './actions-ui';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, withLatestFrom, take, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SignalRService } from '../signalr.service';
import { selectAfterLoginRedirect, selectCurrentUser } from './selectors';

@Injectable()
export class Effects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private apiService: ApiService,
        private router: Router,
        public signalRService: SignalRService
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UiActions.loginWithCredentials, SystemActions.loginWithToken),
            switchMap((action) => {
                return this.apiService.login(action.loginCredential).pipe(
                    map((loginResult) => ApiActions.loginSuccess({ loginResult: loginResult })),
                    catchError((error) => of(ApiActions.loginFailure({ message: error })))
                )
            })
        )
    );

    loginSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.loginSuccess),
            withLatestFrom(this.store.select(selectAfterLoginRedirect), this.store.select(selectCurrentUser)),
            tap(([action, afterLoginRedirect, currentUser]) => {
                if (action.loginResult.accessToken)
                    localStorage["access-token"] = JSON.stringify(action.loginResult.accessToken);

                this.signalRService.startConnection(currentUser?.id);
                this.router.navigateByUrl(afterLoginRedirect);
            })
        ), { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemActions.logoutOnServerUnauthorised, UiActions.logoutUserInitiated),
            tap(() => {
                localStorage["access-token"] = JSON.stringify(null);
                window.location.href = "/"; //TODO: clear the state instead
            }), take(1)
        ),
    );

    loadTickets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UiActions.loadTicketsRequested),
            switchMap((action) => {
                return this.apiService.getTicketList(action.includeClosed).pipe(
                    map((tickets) => ApiActions.loadTicketsSuccess({ tickets: tickets })),
                    catchError(() => of(ApiActions.loadTicketsFailure()))
                )
            })
        )
    );

    loadTicketBoard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UiActions.loadTicketBoardRequested),
            switchMap((action) => {
                return this.apiService.getTicketBoard(action.includeClosed).pipe(
                    map((board) => ApiActions.loadTicketBoardSuccess({ board: board })),
                    catchError(() => of(ApiActions.loadTicketBoardFailure()))
                )
            })
        )
    );

    loadTicketFailure = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.loadTicketsFailure, ApiActions.loadTicketBoardFailure),
            tap(() => alert('There was a problem loading tickets from the server'))
        )
    );

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UiActions.loadUserListRequested),
            switchMap((action) => {
                return this.apiService.getUserList().pipe(
                    map((users) => ApiActions.loadUserListSuccess({ users: users })),
                    catchError(() => of(ApiActions.loadUserListFailure()))
                )
            })
        )
    );

    loadUsersFailure = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.loadUserListFailure),
            tap(() => alert('There was a problem loading users from the server'))
        )
    );
}