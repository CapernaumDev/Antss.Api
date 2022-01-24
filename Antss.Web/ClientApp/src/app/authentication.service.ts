import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from './models/user';
import { AppStoreService } from './app.store.service';
import { CurrentUser } from './models/current-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient, private appStoreService: AppStoreService) {  }
  i = 1;
  login(user: User) {
    this.http.post<CurrentUser>(`${environment.apiUrl}/App/Login`, user)
      .pipe(first())
      .subscribe(
        result => {
          this.appStoreService.setCurrentUser(Object.assign(new CurrentUser(), result));
          this.router.navigate(['']);
        },
        err => {
          alert('login failed');
        });
  }

  logout() {
    this.appStoreService.setCurrentUser(new CurrentUser);
    this.router.navigate(['']);
  }
}
