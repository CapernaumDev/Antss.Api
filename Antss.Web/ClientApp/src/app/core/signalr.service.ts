import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import * as signalR from "@microsoft/signalr";
import { Store } from '@ngrx/store';
import { updateAssignableUsers } from './store/actions';
import { AppState } from './store/app.state';

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
            console.log('joined group: ' + this.message);
        });

        this.hubConnection?.on('updateAssignableUsers', (data) => {
            console.log('updateAssignableUsers: ');
            console.log(data);
            this.store.dispatch(updateAssignableUsers({ options: data }));
        });

        this.hubConnection
            .start()
            .then(() => { 
                console.log('Connection started') ;
            })
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public addDataListener = () => {
        this.hubConnection?.on('test', (data) => {
            this.message = data;
            console.log(this.message);
        });
    }
}
