import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { UserListItem } from '@app/core/models/user/user-list-item';
import { UserListDataSource } from '@app/core/data-sources/user-list-data-source';
import { SortableDirective } from '@app/core/directives/sortable.directive';

@Component({
  selector: 'user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  usersDataSource = new UserListDataSource([]);
  users$: Observable<UserListItem[]> = this.usersDataSource.data$;

  @ViewChild(SortableDirective) sorter!: SortableDirective;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const users$ = this.apiService.getUserList();
    this.usersDataSource.updateData(users$);
  }

  ngAfterViewInit() {
    this.usersDataSource.sorter = this.sorter;
  }

  ngOnDestroy() {
    this.usersDataSource.destroy();
  }
}
