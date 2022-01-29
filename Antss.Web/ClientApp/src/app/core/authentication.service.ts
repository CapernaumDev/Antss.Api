import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError , take } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AppStoreService } from './app.store.service';
import { CurrentUser } from './models/user/current-user';
import { LoginResult } from './models/login-result';
import { LoginCredential } from './models/login-credential';
import { firstValueFrom, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient, private appStoreService: AppStoreService) { }

  async login(loginCredential: LoginCredential) {
    this.appStoreService.setSigningIn(true);

    let result = await firstValueFrom(
      this.http.post<LoginResult>(`${environment.apiUrl}/Authentication/Login/`, loginCredential)
      .pipe(
        catchError(x => {
          alert(x);

          return throwError(x);
        })
      ));

    this.appStoreService.setSigningIn(false);

    let user = Object.assign(new CurrentUser(), result.user);
    user.accessToken = result.accessToken || JSON.parse(localStorage["api-token"]);
    this.appStoreService.setCurrentUser(user);
    this.appStoreService.setOffices(result.appData.offices);
    this.appStoreService.setUserTypes(result.appData.userTypes);
    this.appStoreService.setAssignableUsers(result.appData.assignableUsers);

    this.appStoreService.redirectAfterLogin$.pipe(
      take(1)
    ).subscribe(x => {
      this.router.navigateByUrl(x);
    });

    if (result.accessToken) {
      localStorage["api-token"] = JSON.stringify(result.accessToken);
    }
  }

  logout() {
    localStorage["api-token"] = JSON.stringify(null);
    this.appStoreService.setCurrentUser(new CurrentUser);
    this.router.navigate(['']);
  }
}
