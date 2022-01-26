import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AppStoreService } from './app.store.service';
import { CurrentUser } from './models/user/current-user';
import { LoginResult } from './models/login-result';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient, private appStoreService: AppStoreService) { }

  login(userId: number) {
    this.http.post<LoginResult>(`${environment.apiUrl}/App/Login`, { userId })
      .pipe(first())
      .subscribe( //TODO: Marked as deprecated since last rxJs update
        result => {
          let user = Object.assign(new CurrentUser(), result.user);
          user.accessToken = result.accessToken;
          this.appStoreService.setCurrentUser(user);
          this.appStoreService.setOffices(result.appData.offices);
          this.appStoreService.setUserTypes(result.appData.userTypes);
          localStorage["api-token"] = result.accessToken;
          this.router.navigate(['']);
        },
        err => {
          alert('login failed');
        });
  }

  logout() {
    localStorage["api-token"] = null;
    this.appStoreService.setCurrentUser(new CurrentUser);
    this.router.navigate(['']);
  }
}
