import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { TicketListItem } from '@core/models/ticket/ticket-list-item';
import { SortableDirective } from '@app/core/directives/sortable.directive';
import { TicketListDataSource } from '@app/core/data-sources/ticket-list-data-source';
import { FilterSourceDirective } from '../../core/directives/filter-source.directive';

@Component({
  selector: 'ticket-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent implements OnInit {
  ticketsDataSource = new TicketListDataSource([]);
  tickets$: Observable<TicketListItem[]> = this.ticketsDataSource.data$;

  @ViewChild(SortableDirective) sorter!: SortableDirective;
  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const tickets$ = this.apiService.getTicketList();
    this.ticketsDataSource.updateData(tickets$);
  }

  ngAfterViewInit() {
    this.ticketsDataSource.sorter = this.sorter;
    this.ticketsDataSource.filterSource = this.filterSource;
  }

  ngOnDestroy() {
    this.ticketsDataSource.destroy();
  }
}
