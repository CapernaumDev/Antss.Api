import { CurrentUser } from "../models/user/current-user";

export interface AppState {
    authentication: {
        currentUser: CurrentUser | null;
        status: 'pending' | 'loading' | 'error' | 'success';
        afterLoginRedirect: string
    }
}

export const initialState: AppState = {
    authentication: {
        currentUser: null,
        status: 'pending',
        afterLoginRedirect: 'xx'
    }
};