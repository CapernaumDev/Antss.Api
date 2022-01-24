import { Office } from './office';

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  userType!: string;
  contactNumber!: string;
  emailAddress!: string;
  officeId!: number;
  office!: Office;
}
