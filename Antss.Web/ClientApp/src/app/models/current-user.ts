import { User } from "./user";

export class CurrentUser extends User {
  constructor() {
    super();
    isAdmin: this.userType === 'Admin';
    isSupport: this.userType === 'Support' || this.userType === 'Admin';
    isUser: this.userType === 'User';
  }
}
