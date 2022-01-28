import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { UserListItem } from '@app/core/models/user/user-list-item';

@Component({
  selector: 'user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {

  UserList!: Observable<UserListItem[]>;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.UserList = this.apiService.getUserList();
  }
}
