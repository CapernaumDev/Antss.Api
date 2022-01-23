import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Ticket } from './models/ticket';
import { AppData } from './models/appData';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = 'https://localhost:7210/api/';
  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'User/List');
  }

  getTicketList(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url + 'Ticket/List');
  }

  getAppData(): Observable<AppData> {
    return this.http.get<AppData>(this.url + 'App/Appdata');
  }
}
