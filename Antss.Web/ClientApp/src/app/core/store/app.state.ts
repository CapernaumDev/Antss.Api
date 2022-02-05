import { OptionItem } from "../models/option-item";
import { CurrentUser } from "../models/user/current-user";

export interface AppState {
    currentUser: CurrentUser | null;
    status: 'pending' | 'loading' | 'error' | 'success';
    afterLoginRedirect: string
    assignableUsers: OptionItem[],
    offices: OptionItem[],
    userTypes: OptionItem[]
}

export const initialState: AppState = {
    currentUser: null,
    status: 'pending',
    afterLoginRedirect: '',
    assignableUsers: [],
    offices: [],
    userTypes: []
};
