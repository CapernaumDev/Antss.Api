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
            .withUrl(`${environment.signalrUrl}/test`)
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    public addTestDataListener = () => {
        this.hubConnection?.on('test', (data) => {
            this.message = data;
            console.log(this.message);
        });
    }
}