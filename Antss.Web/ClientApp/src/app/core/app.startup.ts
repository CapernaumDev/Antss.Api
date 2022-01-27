import { Injectable } from "@angular/core";
import { AppStoreService } from "./app.store.service";
import { AuthenticationService } from "./authentication.service";
import { LoginCredential } from "./models/login-credential";
import { CurrentUser } from "./models/user/current-user";

@Injectable({
  providedIn: 'root'
})
export class AppStartup {
  constructor(private authenticationService: AuthenticationService, private appStoreService: AppStoreService) {

  }

  loginWithAccessToken() {
    let tokenStringValue = localStorage["api-token"]
    if (!tokenStringValue) return;

    let token = JSON.parse(tokenStringValue);
    if (!token) return;
    
    let credential = new LoginCredential();
    credential.accessToken = token;
    if (token != null) {
      let userWithToken = new CurrentUser();
      userWithToken.accessToken = token;
      this.appStoreService.setCurrentUser(userWithToken);
      this.authenticationService.login(credential);
    }
  }
}
