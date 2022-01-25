import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Ticket } from './models/ticket';
import { AppData } from './models/app-data';
import { KeyValuePair } from './models/key-value-pair';
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

  createUser(user: User): Observable<KeyValuePair> {
    return this.http.post<KeyValuePair>(`${environment.apiUrl}/User/Create`, user);
  }
}
