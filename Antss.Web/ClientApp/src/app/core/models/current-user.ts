import { User } from "./user/user";

export class CurrentUser extends User {

  constructor() {
    super();
  }

  get isAdmin() {
    return this.userType === 'Admin';
  }

  get isSupport() {
    return this.userType === 'Support' || this.userType === 'Admin';
  }

  get isUser() {
    return this.userType === 'User';
  }

  get basicAuthToken() {
    return window.btoa(this.id + ':' + 'password');
  }
}
