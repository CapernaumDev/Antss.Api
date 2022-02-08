import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { catchError, Observable, Subscription, take } from 'rxjs';
import { ApiService } from '@app/core/api.service';
import { TicketBoardDataSource } from './board-data-source';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { UpdateTicketStatus } from '@app/core/models/ticket/update-ticket-status';
import { AppState } from '@app/core/store/app.state';
import { loadTicketBoardRequested, ticketStatusUpdatedByUser } from '@app/core/store/actions';
import { selectShowSuccessForTicket, selectTicketBoard } from '@app/core/store/selectors';
import { TicketStatuses } from '@app/core/models/ticket/ticket-statuses';
import { ServerConfirmationEvent } from '@app/core/interfaces/server-confirmation-event';

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
  showConfirmationFor$: Observable<ServerConfirmationEvent | null> = this.store.select(selectShowSuccessForTicket)
  showConfirmationFor?: ServerConfirmationEvent | null;
  private subscription!: Subscription;

  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private store: Store<AppState>){
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: false })); 
    this.boardDataSource.setDataSource(this.store.select(selectTicketBoard));  
  }

  ngOnInit(): void {
    this.subscription = this.showConfirmationFor$
      .subscribe((ticket) => {
        this.showConfirmationFor = ticket;
        this.cdr.detectChanges();
        this.showConfirmationFor = null;
      });
  }

  public drop(event: CdkDragDrop<TicketListItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let ticket = event.previousContainer.data[event.previousIndex];
      let ticketStatusId = parseInt(event.container.id);
      let newTicketStatus = TicketStatuses[ticketStatusId].replace('_', ' '); //TODO: sort this out

      this.store.dispatch(ticketStatusUpdatedByUser({ 
        ticket: {...ticket, ticketStatus: newTicketStatus}, 
        boardColumnIndex: event.currentIndex 
      }));

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
            // this.showConfirmationFor = ticket.id;
            // this.cdr.detectChanges(); //onPush strategy needs a shove here
          });
    }
  }

  reload(event: Event) {
    let target = event.target as HTMLInputElement;
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: target.checked }))
  }

  ngAfterViewInit() {
    this.boardDataSource.filterSource = this.filterSource;
  }

  ngOnDestroy() {
    this.boardDataSource.destroy();
    this.subscription.unsubscribe();
  }
}
