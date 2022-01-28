import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, take } from 'rxjs';
import { AppStoreService } from './app.store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appStoreService: AppStoreService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      let routeRole = route.data["role"] as string;
      let redirectAfterLogin = route.url.toString();

      this.appStoreService.currentUser$.pipe(
        take(1)
      ).subscribe(x => {
          if (x.id > 0) {
            if (routeRole && routeRole.includes('Admin') && !x.isAdmin) {
              obs.next(false);
              this.router.navigate(['']);
              return;
            }

            obs.next(true);
          } else {
            this.appStoreService.setRedirectAfterLogin(redirectAfterLogin);
            obs.next(false);
            this.router.navigate(['login']);
          }
        });
    });
  }
}
