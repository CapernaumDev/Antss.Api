import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { loginWithToken } from './store/actions';
import { LoginCredential } from "./models/login-credential";

@Injectable({
  providedIn: 'root'
})
export class AppStartup {
  constructor(private store: Store<AppState>) {
  }

  attemptTokenLogin() {
    let tokenStringValue = localStorage["access-token"]
    if (!tokenStringValue) return;

    let token = JSON.parse(tokenStringValue);
    if (!token) return;
    
    let loginCredential = new LoginCredential();
    loginCredential.accessToken = token;
    this.store.dispatch(loginWithToken({loginCredential: loginCredential }));
  }
}
