import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Ticket } from './models/ticket';
import { AppData } from './models/app-data';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User/List`);
  }

  getTicketList(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/Ticket/List`);
  }

  getAppData(): Observable<AppData> {
    return this.http.get<AppData>(`${environment.apiUrl}/App/Appdata`);
  }

  createUser(user: User) {
    return this.http.post(`${environment.apiUrl}/User/Create`, user);
  }

  createTicket(ticket: Ticket) {
    return this.http.post(`${environment.apiUrl}/Ticket/Create`, ticket)
  }
}
