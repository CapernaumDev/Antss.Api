import { User } from "./user";

export class CurrentUser extends User {
  public accessToken!: string;
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
    return window.btoa(`${this.id}:${this.accessToken || ''}`);
  }
}
