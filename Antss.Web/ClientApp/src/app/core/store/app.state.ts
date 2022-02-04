import { OptionItem } from "../models/option-item";
import { CurrentUser } from "../models/user/current-user";

export interface AppState {
    authentication: {
        currentUser: CurrentUser | null;
        status: 'pending' | 'loading' | 'error' | 'success';
        afterLoginRedirect: string
    },
    optionItems: {
        assignableUsers: OptionItem[],
        offices: OptionItem[],
        userTypes: OptionItem[]
    }
}

export const initialState: AppState = {
    authentication: {
        currentUser: null,
        status: 'pending',
        afterLoginRedirect: 'xx'
    },
    optionItems: {
        assignableUsers: [],
        offices: [],
        userTypes: []
    }
};