import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { User } from '@core/models/user';

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
