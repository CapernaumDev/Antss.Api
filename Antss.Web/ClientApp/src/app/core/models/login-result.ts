import { AppData } from "./app-data";
import { CurrentUser } from "./user/current-user";

export class LoginResult {
  user!: CurrentUser;
  appData!: AppData;
  accessToken!: string
}
