import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { catchError, Observable, take } from 'rxjs';
import { ApiService } from '@app/core/api.service';
import { TicketBoardDataSource } from './board-data-source';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { UpdateTicketStatus } from '@app/core/models/ticket/update-ticket-status';
import { AppState } from '@app/core/store/app.state';
import { loadTicketBoardRequested, ticketStatusUpdatedByUser } from '@app/core/store/actions-ui';
import { TicketStatuses } from '@app/core/models/ticket/ticket-statuses';
import { selectTicketBoard } from '@app/core/store/selectors';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TicketBoardComponent implements OnInit {
  boardDataSource = new TicketBoardDataSource([]);
  board$: Observable<BoardColumn<TicketListItem>[]> = this.boardDataSource.data$;
  recordCount$: Observable<number> = this.boardDataSource.recordCount$;
  filterTerm!: string;

  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService, private store: Store<AppState>){
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: false })); 
    this.boardDataSource.setDataSource(this.store.select(selectTicketBoard));  
  }

  ngOnInit(): void {

  }

  public drop(event: CdkDragDrop<TicketListItem[]>): void {
    if (event.previousContainer === event.container) return;

    let ticket = event.previousContainer.data[event.previousIndex];
    let ticketStatusId = parseInt(event.container.id);
    let newTicketStatus = TicketStatuses[ticketStatusId].replace('_', ' '); //TODO: sort this out

    this.store.dispatch(ticketStatusUpdatedByUser({ 
      ticket: {...ticket, ticketStatus: newTicketStatus}, 
      boardColumnIndex: event.currentIndex 
    }));

    //TODO: through store
    this.apiService.updateTicketStatus(new UpdateTicketStatus(ticket.id, ticketStatusId, event.currentIndex))
      .pipe(
        take(1),
        catchError(err => {
          alert('There was a problem updating the ticket status');
          this.store.dispatch(ticketStatusUpdatedByUser({ 
            ticket: ticket, 
            boardColumnIndex: event.previousIndex 
          }));
          throw err;
        }))
        .subscribe(() => {
        });
  }

  trackTicketBy(index: number, ticket: TicketListItem): number {
    return ticket.id;
  }

  trackColumnBy(index: number, boardColumn: BoardColumn<TicketListItem>): number {
    return boardColumn.id;
  }

  reload(event: Event) {
    let target = event.target as HTMLInputElement;
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: target.checked }))
  }

  ngAfterViewInit() {
    this.boardDataSource.filterSource = this.filterSource;
    this.filterSource.filterChange
      .subscribe((setFilterEvent) => { 
        this.filterTerm = setFilterEvent.filterTerm || '';
      });    
  }

  ngOnDestroy() {
    this.boardDataSource.destroy();
  }
}
