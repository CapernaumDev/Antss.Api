import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {

  UserList!: Observable<User[]>;
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.UserList = this.apiService.getUserList();
  }
}
