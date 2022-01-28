import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user/user';
import { CreateTicket } from './models/ticket/create-ticket';
import { TicketListItem } from './models/ticket/ticket-list-item';
import { AppData } from './models/app-data';
import { environment } from '@environments/environment';
import { PostResult } from './models/post-result';
import { UserListItem } from './models/user/user-list-item';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getUserList(): Observable<UserListItem[]> {
    return this.http.get<UserListItem[]>(`${environment.apiUrl}/User/List`);
  }

  getTicketList(): Observable<TicketListItem[]> {
    return this.http.get<TicketListItem[]>(`${environment.apiUrl}/Ticket/List`);
  }

  loadUser(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/User/Get`, { params: { id: userId }});
  }

  createUser(user: User): Observable<PostResult> {
    return this.http.post<PostResult>(`${environment.apiUrl}/User/Create`, user);
  }

  updateUser(user: User): Observable<PostResult> {
    return this.http.post<PostResult>(`${environment.apiUrl}/User/Update`, user);
  }

  createTicket(ticket: CreateTicket) {
    return this.http.post(`${environment.apiUrl}/Ticket/Create`, ticket)
  }
}
