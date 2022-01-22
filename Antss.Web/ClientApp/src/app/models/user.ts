import { Office } from './office';

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  userType!: string;
  location!: string;
  contactNumber!: string;
  emailAddress!: string;
  office!: Office;
}
