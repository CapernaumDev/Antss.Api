import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, take } from 'rxjs';
import { AppStoreService } from './app.store.service';
import { setAfterLoginRedirect } from './store/actions';
import { AppState } from './store/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appStoreService: AppStoreService,
    private store: Store<AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      let routeRole = route.data["role"] as string;
      let redirectAfterLogin = route.url.toString();

      this.store.select(x => x.authentication.currentUser).pipe(
        take(1)
      ).subscribe(user => {
        if (!user) {
          this.store.dispatch(setAfterLoginRedirect({ url: redirectAfterLogin }));
          obs.next(false);
          this.router.navigate(['login']);
        } else {
          if (routeRole && routeRole.includes('Admin') && !user.isAdmin) {
            obs.next(false);
            this.router.navigate(['']);
            return;
          }

          obs.next(true);
        }
      })

      // this.appStoreService.currentUser$.pipe(
      //   take(1)
      // ).subscribe(x => {
      //     if (x.isLoggedIn) {
      //       if (routeRole && routeRole.includes('Admin') && !x.isAdmin) {
      //         obs.next(false);
      //         this.router.navigate(['']);
      //         return;
      //       }

      //       obs.next(true);
      //     } else {
      //       this.store.dispatch(setAfterLoginRedirect({ url: redirectAfterLogin }))
      //       this.appStoreService.setRedirectAfterLogin(redirectAfterLogin);
      //       obs.next(false);
      //       this.router.navigate(['login']);
      //     }
      //   });
    });
  }
}
