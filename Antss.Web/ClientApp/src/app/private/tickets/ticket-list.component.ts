import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { TicketListItem } from '@core/models/ticket/ticket-list-item';
import { SortableDirective } from '@app/core/directives/sortable.directive';
import { TicketListDataSource } from './ticket-list-data-source';
import { FilterSourceDirective } from '../../core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';

@Component({
  selector: 'ticket-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent implements OnInit {
  ticketsDataSource = new TicketListDataSource([]);
  tickets$: Observable<TicketListItem[]> = this.ticketsDataSource.data$;
  recordCount$: Observable<number> = this.ticketsDataSource.recordCount$;
  
  @ViewChild(SortableDirective) sorter!: SortableDirective;
  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const tickets$ = this.apiService.getTicketList(false);
    this.ticketsDataSource.updateData(tickets$);
  }

  ngAfterViewInit() {
    this.ticketsDataSource.sorter = this.sorter;
    this.ticketsDataSource.filterSource = this.filterSource;
  }

  reload(event: Event) {
    let target = event.target as HTMLInputElement;
    const tickets$ = this.apiService.getTicketList(target.checked);
    this.ticketsDataSource.updateData(tickets$);
  }

  ngOnDestroy() {
    this.ticketsDataSource.destroy();
  }
}
