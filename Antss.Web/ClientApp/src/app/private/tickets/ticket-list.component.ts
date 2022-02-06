import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketListItem } from '@core/models/ticket/ticket-list-item';
import { SortableDirective } from '@app/core/directives/sortable.directive';
import { TicketListDataSource } from './ticket-list-data-source';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { AppState } from '@app/core/store/app.state';
import { Store } from '@ngrx/store';
import { loadTicketsRequested } from '@app/core/store/actions';
import { selectTicketList } from '@app/core/store/selectors';

@Component({
  selector: 'ticket-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent {
  ticketsDataSource = new TicketListDataSource([]);
  tickets$: Observable<TicketListItem[]> = this.ticketsDataSource.data$;
  recordCount$: Observable<number> = this.ticketsDataSource.recordCount$;
  
  @ViewChild(SortableDirective) sorter!: SortableDirective;
  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private store: Store<AppState>) { 
    this.store.dispatch(loadTicketsRequested({ includeClosed: false })); 
    this.ticketsDataSource.setDataSource(this.store.select(selectTicketList));  
  }

  ngAfterViewInit() {
    this.ticketsDataSource.sorter = this.sorter;
    this.ticketsDataSource.filterSource = this.filterSource;
  }

  reload(event: Event) {
    let target = event.target as HTMLInputElement;
    this.store.dispatch(loadTicketsRequested({ includeClosed: target.checked }))
  }

  ngOnDestroy() {
    this.ticketsDataSource.destroy();
  }
}
