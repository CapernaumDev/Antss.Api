import * as AppActions from './actions';
import {  Injectable } from '@angular/core';
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
                this.signalRService.addDataListener();   

                this.router.navigateByUrl(afterLoginRedirect);
            })
        ), { dispatch: false }
    );

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AppActions.logoutOnServerUnauthorised, AppActions.logoutUserInitiated),
            tap(() => {
                localStorage["access-token"] = JSON.stringify(null);
                window.location.href = "/";
            }), take(1)
        ),
    );
}