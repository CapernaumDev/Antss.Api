import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { UserListItem } from '@app/core/models/user/user-list-item';
import { UserListDataSource } from './user-list-data-source';
import { SortableDirective } from '@app/core/directives/sortable.directive';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';

@Component({
  selector: 'user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  usersDataSource = new UserListDataSource([]);
  users$: Observable<UserListItem[]> = this.usersDataSource.data$;
  recordCount$: Observable<number> = this.usersDataSource.recordCount$;

  @ViewChild(SortableDirective) sorter!: SortableDirective;
  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const users$ = this.apiService.getUserList();
    this.usersDataSource.updateData(users$);
  }

  ngAfterViewInit() {
    this.usersDataSource.sorter = this.sorter;
    this.usersDataSource.filterSource = this.filterSource;
  }

  ngOnDestroy() {
    this.usersDataSource.destroy();
  }
}
