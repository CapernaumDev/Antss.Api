import * as AppActions from './actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, withLatestFrom, take, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SignalRService } from '../signalr.service';
import { selectAfterLoginRedirect } from './selectors';

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
            ofType(AppActions.loginWithCredentials, AppActions.loginWithToken),
            switchMap((action) => {
                return this.apiService.login(action.loginCredential).pipe(
                    map((loginResult) => AppActions.loginSuccess({ loginResult: loginResult })),
                    catchError((error) => of(AppActions.loginFailure({ message: error })))
                )
            })
        )
    );

    loginSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loginSuccess),
            withLatestFrom(this.store.select(selectAfterLoginRedirect)),
            tap(([action, afterLoginRedirect]) => {
                if (action.loginResult.accessToken)
                    localStorage["access-token"] = JSON.stringify(action.loginResult.accessToken);

                this.signalRService.startConnection();
                this.router.navigateByUrl(afterLoginRedirect);
            })
        ), { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.logoutOnServerUnauthorised, AppActions.logoutUserInitiated),
            tap(() => {
                localStorage["access-token"] = JSON.stringify(null);
                window.location.href = "/"; //TODO: clear the state instead
            }), take(1)
        ),
    );

    loadTickets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadTicketsRequested),
            switchMap((action) => {
                return this.apiService.getTicketList(action.includeClosed).pipe(
                    map((tickets) => AppActions.loadTicketsSuccess({ tickets: tickets })),
                    catchError(() => of(AppActions.loadTicketsFailure()))
                )
            })
        )
    );

    loadTicketBoard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadTicketBoardRequested),
            switchMap((action) => {
                return this.apiService.getTicketBoard(action.includeClosed).pipe(
                    map((board) => AppActions.loadTicketBoardSuccess({ board: board })),
                    catchError(() => of(AppActions.loadTicketBoardFailure()))
                )
            })
        )
    );

    loadTicketFailure = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadTicketsFailure, AppActions.loadTicketBoardFailure),
            tap(() => alert('There was a problem loading tickets from the server'))
        )
    );

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadUserListRequested),
            switchMap((action) => {
                return this.apiService.getUserList().pipe(
                    map((users) => AppActions.loadUserListSuccess({ users: users })),
                    catchError(() => of(AppActions.loadTicketsFailure()))
                )
            })
        )
    );

    loadUsersFailure = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadUserListFailure),
            tap(() => alert('There was a problem loading users from the server'))
        )
    );
}