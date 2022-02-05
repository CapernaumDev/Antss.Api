import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import * as signalR from "@microsoft/signalr";

@Injectable({
    providedIn: 'root'
})

export class SignalRService {
    public message?: string;
    private hubConnection?: signalR.HubConnection

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
