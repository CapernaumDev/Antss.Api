import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import * as signalR from "@microsoft/signalr";
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { 
    setInitialAppData, 
    ticketCreated,
    ticketStatusUpdatedByServer, 
    updateAssignableUsers, 
    userCreated,
    userUpdated
} from './store/actions';

@Injectable({
    providedIn: 'root'
})

export class SignalRService {
    public message?: string;
    private hubConnection?: signalR.HubConnection;

    constructor(private store: Store<AppState>) {
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.signalrUrl, { 
                accessTokenFactory: () => window.btoa(JSON.parse(localStorage["access-token"]))
            },)
            .withAutomaticReconnect()
            .configureLogging(environment.production ? signalR.LogLevel.None : signalR.LogLevel.Debug)
            .build();

        this.hubConnection?.on('joinedGroup', (data) => {
            this.message = data;
        });

        this.hubConnection?.on('updateAssignableUsers', (data) => {
            this.store.dispatch(updateAssignableUsers({ options: data }));
        });

        this.hubConnection?.on('initialAppData', (data) => {
            this.store.dispatch(setInitialAppData({ appData: data }));          
        });

        this.hubConnection?.on('ticketCreated', (ticket, initiatedByUserId) => {
            this.store.dispatch(ticketCreated({ 
                ticket: ticket,
                boardColumnIndex: 0,
                initiatedByUserId: initiatedByUserId
             }));          
        });

        this.hubConnection?.on('ticketStatusUpdated', (ticket, boardColumnIndex, initiatedByUserId) => {
            this.store.dispatch(ticketStatusUpdatedByServer({ 
                ticket: ticket, 
                boardColumnIndex: boardColumnIndex,
                initiatedByUserId: initiatedByUserId
            }));          
        });

        this.hubConnection?.on('userCreated', (user) => {
            this.store.dispatch(userCreated({ user: user }));          
        });

        this.hubConnection?.on('userUpdated', (user) => {
            this.store.dispatch(userUpdated({ user: user }));          
        });

        this.hubConnection
            .start()
            .then(() => { 
                console.log('Connection started') ;
            })
            .catch(err => console.log('Error while starting connection: ' + err));
    }
}
