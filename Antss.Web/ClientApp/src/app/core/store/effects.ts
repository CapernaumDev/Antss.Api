import * as AppActions from './actions';
import {  Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, withLatestFrom, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
//import { selectAllTodos } from './todo.selectors';
import { AppState } from './app.state';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Injectable()
export class Effects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private apiService: ApiService,
        private router: Router
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loginWithCredentials, AppActions.loginWithToken),
            withLatestFrom(this.store.select(x => x.authentication.afterLoginRedirect)),
            switchMap(([action, afterLoginRedirect]) => {
                return this.apiService.login(action.loginCredential).pipe(
                    map((loginResult) => AppActions.loginSuccess({ loginResult: loginResult })),
                    tap(() => this.router.navigateByUrl(afterLoginRedirect)),
                    catchError((error) => of(AppActions.loginFailure({ message: error })))
                )
            }), take(1)
        )
    );
}