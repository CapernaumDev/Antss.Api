import { AppData } from "./app-data";
import { CurrentUser } from "./current-user";

export class LoginResult {
  user!: CurrentUser;
  appData!: AppData
}
