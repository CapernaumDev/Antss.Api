import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { AppStoreService } from '../app.store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appStoreService: AppStoreService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      let routeRole = route.data["role"] as string;

      this.appStoreService.currentUser$
        .subscribe(x => {
          if (x.id > 0) {
            if (routeRole && routeRole.includes('Admin') && !x.isAdmin) {
              obs.next(false);
              this.router.navigate(['']);
              return;
            }

            obs.next(true);
          } else {
            obs.next(false);
            this.router.navigate(['login']);
          }
        });
    });
  }
}
